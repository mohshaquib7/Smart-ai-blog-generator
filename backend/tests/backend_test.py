"""Backend API tests for AI Blog Generator.
Covers:
- Health check
- POST /api/blogs/generate (valid / invalid input)
- GET /api/blogs (list + sort)
- GET /api/blogs/{id}
- DELETE /api/blogs/{id}
"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("BACKEND_URL", "http://localhost:8001").rstrip("/")
API = f"{BASE_URL}/api"

# Store across tests
SHARED = {}


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"


# ---------- Generate ----------
class TestGenerate:
    def test_generate_empty_topic(self, session):
        r = session.post(f"{API}/blogs/generate", json={"topic": "", "tone": "professional", "length": "short"})
        # Pydantic min_length=2 -> 422
        assert r.status_code in (400, 422)

    def test_generate_invalid_tone(self, session):
        r = session.post(f"{API}/blogs/generate", json={"topic": "AI in 2026", "tone": "weird", "length": "short"})
        assert r.status_code == 422

    def test_generate_valid_short_casual(self, session):
        payload = {"topic": "TEST_The future of remote work in 2026", "tone": "casual", "length": "short"}
        r = session.post(f"{API}/blogs/generate", json=payload, timeout=120)
        assert r.status_code == 200, f"Got {r.status_code}: {r.text[:500]}"
        data = r.json()
        # Required fields
        for field in ["id", "title", "introduction", "sections", "conclusion", "keywords", "meta_description",
                      "topic", "tone", "length", "word_count", "created_at"]:
            assert field in data, f"Missing field: {field}"

        assert isinstance(data["title"], str) and len(data["title"]) > 0
        assert isinstance(data["introduction"], str) and len(data["introduction"]) > 0
        assert isinstance(data["sections"], list)
        assert 3 <= len(data["sections"]) <= 5, f"sections count={len(data['sections'])}"
        for s in data["sections"]:
            assert "heading" in s and "paragraph" in s
            assert len(s["heading"]) > 0 and len(s["paragraph"]) > 0
        assert isinstance(data["keywords"], list)
        assert 5 <= len(data["keywords"]) <= 10, f"keywords count={len(data['keywords'])}"
        assert isinstance(data["meta_description"], str) and len(data["meta_description"]) > 0
        # Tolerant on exact length per agent note; just must exist
        assert data["tone"] == "casual"
        assert data["length"] == "short"
        assert data["word_count"] > 0

        SHARED["blog_id"] = data["id"]
        SHARED["topic"] = payload["topic"]


# ---------- List ----------
class TestList:
    def test_list_blogs_contains_generated(self, session):
        assert "blog_id" in SHARED, "Generate test must pass first"
        r = session.get(f"{API}/blogs")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        assert len(items) >= 1
        # Sorted desc by created_at
        created_times = [it["created_at"] for it in items]
        assert created_times == sorted(created_times, reverse=True)
        ids = [it["id"] for it in items]
        assert SHARED["blog_id"] in ids


# ---------- Get ----------
class TestGet:
    def test_get_blog_by_id(self, session):
        blog_id = SHARED.get("blog_id")
        assert blog_id
        r = session.get(f"{API}/blogs/{blog_id}")
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == blog_id
        assert data["topic"] == SHARED["topic"]
        assert "sections" in data and len(data["sections"]) >= 3

    def test_get_blog_not_found(self, session):
        r = session.get(f"{API}/blogs/does-not-exist-12345")
        assert r.status_code == 404


# ---------- Delete ----------
class TestDelete:
    def test_delete_blog(self, session):
        blog_id = SHARED.get("blog_id")
        assert blog_id
        r = session.delete(f"{API}/blogs/{blog_id}")
        assert r.status_code == 200
        assert r.json().get("success") is True
        # Verify removal
        r2 = session.get(f"{API}/blogs/{blog_id}")
        assert r2.status_code == 404

    def test_delete_missing(self, session):
        r = session.delete(f"{API}/blogs/nonexistent-999")
        assert r.status_code == 404
