from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Literal, Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging early
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

# In-memory storage for blogs (fallback when MongoDB is not available)
BLOGS_STORAGE = {}

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = None
db = None
use_mongodb = False

try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=2000)
    db = client[os.environ.get('DB_NAME', 'blog_generator')]
    use_mongodb = True
    logger.info("MongoDB client initialized (will verify connection on first use)")
except Exception as e:
    logger.warning(f"MongoDB client initialization failed, using in-memory storage: {e}")
    use_mongodb = False

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

app = FastAPI(title="AI Blog Generator API")

# Add CORS middleware FIRST before including router
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Allow all origins for development
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class BlogSection(BaseModel):
    heading: str
    paragraph: str


class BlogContent(BaseModel):
    title: str
    introduction: str
    sections: List[BlogSection]
    conclusion: str
    keywords: List[str]
    meta_description: str


class GenerateRequest(BaseModel):
    topic: str = Field(..., min_length=2, max_length=500)
    tone: Literal["professional", "casual", "technical"] = "professional"
    length: Literal["short", "medium", "long"] = "medium"


class BlogRecord(BlogContent):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    topic: str
    tone: str
    length: str
    word_count: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BlogSummary(BaseModel):
    id: str
    title: str
    topic: str
    tone: str
    length: str
    word_count: int
    created_at: datetime


# ---------- Helpers ----------
LENGTH_MAP = {
    "short": 300,
    "medium": 600,
    "long": 1000,
}


def build_prompt(topic: str, tone: str, length: str) -> str:
    target_words = LENGTH_MAP[length]
    return (
        f"Write a high-quality blog post about: \"{topic}\".\n\n"
        f"Tone: {tone}.\n"
        f"Target length: approximately {target_words} words total.\n\n"
        "Return ONLY a valid JSON object (no markdown, no code fences, no extra text) "
        "matching this exact schema:\n"
        "{\n"
        '  "title": "string - compelling, SEO-friendly blog title",\n'
        '  "introduction": "string - engaging 2-4 sentence intro paragraph",\n'
        '  "sections": [\n'
        '    {"heading": "string", "paragraph": "string - substantive paragraph(s)"}\n'
        "  ],\n"
        '  "conclusion": "string - strong closing paragraph",\n'
        '  "keywords": ["string", "..."],\n'
        '  "meta_description": "string - 150-160 chars, SEO meta description"\n'
        "}\n\n"
        "Constraints:\n"
        "- 'sections' must contain between 3 and 5 entries.\n"
        "- 'keywords' must contain between 5 and 10 entries (lowercase, no hashtags).\n"
        "- 'meta_description' MUST be between 150 and 160 characters.\n"
        "- Body text should be plain prose (no markdown, no asterisks, no headings inside paragraphs).\n"
        "- Do not include the JSON inside markdown code blocks. Output raw JSON only."
    )


def extract_json(text: str) -> dict:
    """Strip code fences if any and parse JSON robustly."""
    cleaned = text.strip()
    # Remove ```json ... ``` or ``` ... ```
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    # Find first { and last } to be safe
    start = cleaned.find("{")
    end = cleaned.rfind("}")
    if start != -1 and end != -1 and end > start:
        cleaned = cleaned[start:end + 1]
    return json.loads(cleaned)


def compute_word_count(content: BlogContent) -> int:
    text = " ".join(
        [content.title, content.introduction]
        + [s.heading + " " + s.paragraph for s in content.sections]
        + [content.conclusion]
    )
    return len(re.findall(r"\b\w+\b", text))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "AI Blog Generator API", "status": "ok"}


@api_router.post("/blogs/generate", response_model=BlogRecord)
async def generate_blog(payload: GenerateRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    if not payload.topic.strip():
        raise HTTPException(status_code=400, detail="Topic is required")

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=f"blog-{uuid.uuid4()}",
        system_message=(
            "You are an expert SEO copywriter who writes clear, engaging, well-structured "
            "blog posts. You ALWAYS respond with strictly valid JSON only, no commentary, "
            "no markdown."
        ),
    ).with_model("openai", "gpt-5.2")

    prompt = build_prompt(payload.topic.strip(), payload.tone, payload.length)

    try:
        raw = await chat.send_message(UserMessage(text=prompt))
    except Exception as exc:
        logger.error("LLM call failed: %s", exc)
        raise HTTPException(status_code=502, detail=f"LLM provider error: {exc}")

    try:
        data = extract_json(raw)
        content = BlogContent(**data)
    except Exception as exc:
        logger.error("Failed to parse LLM output: %s\nRaw: %s", exc, raw[:1000])
        raise HTTPException(
            status_code=502,
            detail="The model returned an invalid response. Please try again.",
        )

    record = BlogRecord(
        **content.model_dump(),
        topic=payload.topic.strip(),
        tone=payload.tone,
        length=payload.length,
        word_count=compute_word_count(content),
    )

    doc = record.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    
    # Save to MongoDB or in-memory storage
    if use_mongodb and db is not None:
        try:
            await db.blogs.insert_one(doc)
            logger.info(f"Blog saved to MongoDB: {record.id}")
        except Exception as e:
            logger.warning(f"Failed to save to MongoDB: {e}, using in-memory storage")
            BLOGS_STORAGE[record.id] = doc
    else:
        BLOGS_STORAGE[record.id] = doc
        logger.info(f"Blog saved to in-memory storage: {record.id}")

    return record


@api_router.get("/blogs", response_model=List[BlogSummary])
async def list_blogs(limit: int = 50):
    items = []
    
    if use_mongodb and db is not None:
        try:
            cursor = db.blogs.find(
                {},
                {
                    "_id": 0,
                    "id": 1,
                    "title": 1,
                    "topic": 1,
                    "tone": 1,
                    "length": 1,
                    "word_count": 1,
                    "created_at": 1,
                },
            ).sort("created_at", -1).limit(limit)
            items = await cursor.to_list(length=limit)
        except Exception as e:
            logger.warning(f"Failed to fetch from MongoDB: {e}, using in-memory storage")
            # Fall through to use in-memory storage
    
    # Use in-memory storage
    if not items:
        # Sort by created_at, handling both datetime and string formats
        def get_sort_key(blog):
            created_at = blog.get("created_at")
            if isinstance(created_at, str):
                return datetime.fromisoformat(created_at)
            return created_at
        
        items = [
            {
                "id": blog["id"],
                "title": blog["title"],
                "topic": blog["topic"],
                "tone": blog["tone"],
                "length": blog["length"],
                "word_count": blog["word_count"],
                "created_at": blog["created_at"],
            }
            for blog in sorted(
                BLOGS_STORAGE.values(),
                key=get_sort_key,
                reverse=True
            )[:limit]
        ]
    
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


@api_router.get("/blogs/{blog_id}", response_model=BlogRecord)
async def get_blog(blog_id: str):
    doc = None
    
    if use_mongodb and db is not None:
        try:
            doc = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
        except Exception as e:
            logger.warning(f"Failed to fetch from MongoDB: {e}, using in-memory storage")
    
    if not doc and blog_id in BLOGS_STORAGE:
        doc = BLOGS_STORAGE[blog_id]
    
    if not doc:
        raise HTTPException(status_code=404, detail="Blog not found")
    if isinstance(doc.get("created_at"), str):
        doc["created_at"] = datetime.fromisoformat(doc["created_at"])
    return doc


@api_router.delete("/blogs/{blog_id}")
async def delete_blog(blog_id: str):
    deleted = False
    
    if use_mongodb and db is not None:
        try:
            result = await db.blogs.delete_one({"id": blog_id})
            deleted = result.deleted_count > 0
        except Exception as e:
            logger.warning(f"Failed to delete from MongoDB: {e}")
    
    if not deleted and blog_id in BLOGS_STORAGE:
        del BLOGS_STORAGE[blog_id]
        deleted = True
    
    if not deleted:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"success": True}


app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()

