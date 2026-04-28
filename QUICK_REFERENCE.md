# Smart AI Blog Generator - Quick Reference Guide

## 🚀 Quick Start (5 Minutes)

### Terminal 1: Start Backend
```bash
cd backend
python run.py
```
✅ Backend runs on `http://localhost:8001`

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```
✅ Frontend runs on `http://localhost:3000`

### Open Browser
- **Application**: http://localhost:3000
- **API Docs**: http://localhost:8001/docs

---

## 📊 System Architecture at a Glance

```
USER BROWSER (Port 3000)
        ↓
    React App
        ↓
    [BlogForm] → Topic, Tone, Length
        ↓
    HTTP Request (Axios)
        ↓
FASTAPI SERVER (Port 8001)
        ↓
    [Process Request]
        ↓
    [Call Mock LLM]
        ↓
    Generate Blog
        ↓
    [Save to Database]
        ↓
    HTTP Response (JSON)
        ↓
    [BlogOutput] → Display Blog
```

---

## 🏗️ Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 | UI Framework |
| | Tailwind CSS | Styling |
| | Axios | HTTP Requests |
| | React Router | Navigation |
| **Backend** | FastAPI | Web Framework |
| | Uvicorn | Web Server |
| | Pydantic | Data Validation |
| **Database** | MongoDB | Data Storage |
| **LLM** | Mock LLM | Blog Generation |

---

## 📁 File Structure Overview

### Frontend Files (What They Do)
```
frontend/src/
├── App.js                    → Main app, routing setup
├── pages/
│   ├── GeneratorPage.jsx     → 🏠 Main page (generate blogs)
│   ├── HistoryPage.jsx       → 📚 Show all blogs
│   └── BlogDetailPage.jsx    → 📄 View one blog
├── components/
│   ├── BlogForm.jsx          → 📝 Input form
│   ├── BlogOutput.jsx        → 📖 Display generated blog
│   ├── Navbar.jsx            → 🔝 Top navigation
│   └── Loader.jsx            → ⏳ Loading spinner
├── services/
│   └── aiService.js          → 🔗 API calls to backend
└── utils/
    ├── blog.js               → Blog helper functions
    └── utils.js              → General utilities
```

### Backend Files (What They Do)
```
backend/
├── server.py                 → 🚀 Main API endpoints
├── run.py                    → ▶️ Start the server
├── .env                      → 🔐 Environment variables
├── emergentintegrations/llm/
│   └── chat.py               → 🤖 Mock AI that generates blogs
└── tests/
    └── backend_test.py       → ✅ Test cases (9 tests)
```

---

## 🔄 How It Works: Step-by-Step

### User Action: Generate Blog

```
1. USER ENTERS DATA
   ├─ Topic: "Artificial Intelligence"
   ├─ Tone: "Professional"
   └─ Length: "Medium"

2. CLICK "GENERATE BLOG"
   └─ Form validates input

3. FRONTEND SENDS REQUEST
   └─ POST http://localhost:8001/api/blogs/generate
      └─ Body: {topic, tone, word_count}

4. BACKEND RECEIVES REQUEST
   └─ Validates data using Pydantic

5. CREATE LLM PROMPT
   └─ "Write about: Artificial Intelligence"

6. MOCK LLM GENERATES BLOG
   └─ Extracts topic: "Artificial Intelligence"
   └─ Creates content with topic embedded
   └─ Returns JSON with blog data

7. BACKEND SAVES BLOG
   └─ Stores in MongoDB
   └─ Or in-memory if MongoDB unavailable

8. BACKEND RETURNS RESPONSE
   └─ JSON with: title, sections, keywords, etc.

9. FRONTEND DISPLAYS BLOG
   └─ BlogOutput component renders content

10. USER SEES COMPLETE BLOG
    ├─ Can read content
    ├─ Can save/delete
    └─ Can view history
```

---

## 📚 API Endpoints Quick Reference

### Create Blog
```
POST /api/blogs/generate
Body: {
  "topic": "AI",
  "tone": "professional",
  "word_count": "medium"
}
Returns: Blog object with all fields
```

### Get All Blogs
```
GET /api/blogs
Returns: Array of all blogs
```

### Get One Blog
```
GET /api/blogs/{blog_id}
Returns: Single blog object
```

### Delete Blog
```
DELETE /api/blogs/{blog_id}
Returns: Success message
```

### Health Check
```
GET /
Returns: Welcome message
```

---

## 💻 Key Code Examples

### Frontend: Making API Call
```javascript
// src/services/aiService.js
const generateBlog = async (topic, tone, wordCount) => {
  const response = await axios.post(
    'http://localhost:8001/api/blogs/generate',
    {
      topic,
      tone,
      word_count: wordCount
    }
  );
  return response.data;
};
```

### Backend: API Endpoint
```python
# backend/server.py
@app.post("/api/blogs/generate")
async def generate_blog(request: GenerateRequest):
    # Validate input
    # Call LLM
    # Save to database
    # Return blog
    return blog_object
```

### Backend: Mock LLM
```python
# backend/emergentintegrations/llm/chat.py
async def send_message(self, message: UserMessage) -> str:
    # Extract topic from message
    topic = extract_topic(message.text)
    
    # Generate blog with topic
    blog = generate_blog_template(topic)
    
    # Return as JSON
    return json.dumps(blog)
```

---

## 🧪 Testing

### Run Tests
```bash
cd backend
pytest tests/backend_test.py -v
```

### What Tests Check
- ✅ API endpoints work correctly
- ✅ Data validation works
- ✅ Error handling works
- ✅ Database operations work
- ✅ Blog generation works

**All 9 tests should pass** ✅

---

## 🎯 User Workflow

```
         START
           ↓
    Open http://localhost:3000
           ↓
    See "Inkwell AI Blog Studio"
           ↓
    ┌─────────┴──────────┐
    ↓                    ↓
GENERATE (Main)      ARCHIVE (History)
    ↓                    ↓
1. Enter Topic      1. View All Blogs
2. Pick Tone        2. Click Blog
3. Pick Length      3. Read Details
4. Click Generate   4. Delete if want
    ↓                    ↓
Wait (Loader)       Back to Home
    ↓
See Generated Blog
    ↓
    ├─ Read ✓
    ├─ Save ✓ (auto-saved)
    └─ Delete ✓
    ↓
Click "Archive" to view all
```

---

## ⚙️ Configuration Files Explained

### `.env` (Environment Variables)
```env
# Where MongoDB is
MONGO_URL=mongodb://localhost:27017
DB_NAME=blog_generator

# Server location
BACKEND_URL=http://localhost:8001

# For real LLM (if upgrading)
EMERGENT_LLM_KEY=your-api-key
```

### `package.json` (Frontend Config)
```json
{
  "scripts": {
    "dev": "craco start",      // Start dev server
    "build": "craco build"     // Build for production
  },
  "dependencies": {            // All libraries used
    "react": "19.0.0",
    "axios": "1.8.4",
    ...
  }
}
```

### `requirements.txt` (Backend Dependencies)
```
fastapi==0.110.1            # Web framework
uvicorn==0.25.0             # Web server
motor==3.3.1                # MongoDB async driver
pydantic>=2.6.4             # Data validation
pytest>=8.0.0               # Testing
...
```

---

## 🐛 Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| **Frontend won't load** | Check if backend is running on port 8001 |
| **Blogs not saving** | MongoDB might be down, check logs (uses in-memory fallback) |
| **API returns 400 error** | Check if required fields are sent (topic, tone, word_count) |
| **Loader never ends** | Backend might have crashed, check backend terminal |
| **Port already in use** | Kill process using port or change port in config |

---

## 📊 Data Flow Summary

```
┌─────────────────┐
│  User Browser   │
│  (React App)    │
└────────┬────────┘
         │
         │ 1. Form Data
         │    (topic, tone, length)
         │
         ↓
┌─────────────────┐
│    Frontend     │
│  Send HTTP POST │
└────────┬────────┘
         │
         │ 2. JSON Request
         │    POST /generate
         │
         ↓
┌─────────────────┐
│  Backend Server │
│   (FastAPI)     │
└────────┬────────┘
         │
         │ 3. Extract Topic
         │    Create Prompt
         │
         ↓
┌─────────────────┐
│   Mock LLM      │
│  Generate Blog  │
└────────┬────────┘
         │
         │ 4. Blog Content
         │    (JSON Format)
         │
         ↓
┌─────────────────┐
│    Database     │
│ Save Blog Data  │
└────────┬────────┘
         │
         │ 5. Blog ID
         │    (Success)
         │
         ↓
┌─────────────────┐
│  Response to    │
│   Frontend      │
└────────┬────────┘
         │
         │ 6. Complete Blog
         │    (JSON)
         │
         ↓
┌─────────────────┐
│   BlogOutput    │
│  Display Blog   │
└─────────────────┘
```

---

## 🎓 Learning Paths

### For Beginners
1. Run the application
2. Generate a few blogs
3. View in browser DevTools (F12)
4. Look at Network tab to see API calls
5. Read the blog data format

### For Intermediate
1. Modify BlogForm.jsx to add fields
2. Change Tailwind CSS colors
3. Add new page in React Router
4. Call different backend endpoints
5. Inspect request/response data

### For Advanced
1. Implement real LLM API
2. Add user authentication
3. Create custom blog templates
4. Deploy to cloud (Vercel, Heroku)
5. Set up CI/CD pipeline

---

## ✅ Verification Checklist

- [ ] Backend running on port 8001?
- [ ] Frontend running on port 3000?
- [ ] Can generate blog with topic/tone/length?
- [ ] Blog displays with title and sections?
- [ ] Can view blog history?
- [ ] Can delete blogs?
- [ ] All 9 tests passing?
- [ ] No errors in console (F12)?

---

## 📞 Quick Debugging

### Check Backend Health
```bash
curl http://localhost:8001/
# Should return: {"message": "Welcome to AI Blog Generator API"}
```

### Check API Docs
- Visit: http://localhost:8001/docs
- Try endpoints directly in Swagger UI

### Check Frontend Logs
- Open browser: F12 (DevTools)
- Console tab: Check for errors
- Network tab: See API requests

### Check Backend Logs
- Look at terminal where `python run.py` is running
- See error messages and request logs

---

## 🎨 Project Customization Ideas

| Element | How to Change |
|---------|---|
| **Colors** | Edit `tailwind.config.js` |
| **Logo/Title** | Edit `frontend/public/index.html` |
| **Blog Tone** | Add options in `BlogForm.jsx` dropdown |
| **Blog Length** | Add more size options in form |
| **Fields in Blog** | Modify `chat.py` template |
| **Styling** | Edit `src/App.css` |

---

## 📖 File Reading Order (For Teachers)

1. **Start Here**: `PROJECT_DOCUMENTATION.md` (Full guide)
2. **Quick Start**: This file (`QUICK_REFERENCE.md`)
3. **Frontend Entry**: `frontend/src/App.js`
4. **Main Page**: `frontend/src/pages/GeneratorPage.jsx`
5. **API Calls**: `frontend/src/services/aiService.js`
6. **Backend Entry**: `backend/server.py`
7. **LLM Logic**: `backend/emergentintegrations/llm/chat.py`
8. **Tests**: `backend/tests/backend_test.py`

---

## 🚀 Next Steps

1. **Understanding**: Read PROJECT_DOCUMENTATION.md
2. **Running**: Start backend and frontend
3. **Testing**: Generate blogs and check API responses
4. **Learning**: Study the code files in order
5. **Modifying**: Make small changes to understand flow
6. **Deploying**: Set up cloud hosting

---

**Created**: April 2026  
**For**: Students, Teachers, and Developers  
**Purpose**: Quick Reference Guide for Smart AI Blog Generator
