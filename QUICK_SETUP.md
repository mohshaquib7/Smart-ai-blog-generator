# 🎯 Quick Setup Reference - Smart AI Blog Generator

## 📱 For Your Other Device

---

## 1️⃣ PRE-INSTALLATION (Do First)

### Download & Install These First:

| What | Download Link | Notes |
|------|--|---------|
| **Node.js** | https://nodejs.org/ | Get LTS version (v18+) |
| **Python** | https://www.python.org/downloads/ | Get 3.10+ (Check "Add to PATH") |
| **Git** (Optional) | https://git-scm.com/ | Makes cloning easier |

### Verify Installation:
```bash
node --version    # Should show v18+
npm --version     # Should show 9+
python --version  # Should show 3.10+
```

---

## 2️⃣ GET THE PROJECT

### Option A: Using Git (Fast)
```bash
git clone https://github.com/mohshaquib7/Smart-ai-blog-generator.git
cd Smart-ai-blog-generator
```

### Option B: Manual Download
1. Go to: https://github.com/mohshaquib7/Smart-ai-blog-generator
2. Click **Code** → **Download ZIP**
3. Extract and open folder

---

## 3️⃣ AUTO SETUP (Recommended)

### Windows (PowerShell/CMD):
```bash
cd Smart-ai-blog-generator
setup.bat
```

### macOS/Linux (Terminal):
```bash
cd Smart-ai-blog-generator
chmod +x setup.sh
./setup.sh
```

---

## 4️⃣ MANUAL SETUP (If Auto Fails)

### Backend Setup:
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file with:
# BACKEND_URL=http://localhost:8001
# MONGO_URL=mongodb://localhost:27017
# DB_NAME=blog_generator
```

### Frontend Setup:
```bash
cd frontend
npm install
```

---

## 5️⃣ RUN THE PROJECT

### Open 3 Terminal Windows:

**Terminal 1 - Backend:**
```bash
cd backend
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
python run.py
# You'll see: Uvicorn running on http://0.0.0.0:8001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# You'll see: http://localhost:3000
```

**Terminal 3 - MongoDB (Optional):**
```bash
mongod
# If you installed MongoDB
```

---

## 6️⃣ ACCESS & TEST

| What | URL | Purpose |
|------|-----|---------|
| **App** | http://localhost:3000 | Main application |
| **API Docs** | http://localhost:8001/docs | API testing |
| **Health Check** | http://localhost:8001/ | Backend status |

---

## 7️⃣ COMMON ISSUES & FIXES

| Problem | Solution |
|---------|----------|
| **"python not found"** | Add Python to PATH (Google: "Add Python to Windows PATH") |
| **"npm not found"** | Restart computer after installing Node.js |
| **"Port 8001 in use"** | Kill process: `netstat -ano \| findstr :8001` (Windows) |
| **Virtual env not activating** | Make sure you're in `backend/` folder first |
| **Module not found errors** | Make sure venv is activated before running |
| **npm install stuck** | Delete `node_modules` and `package-lock.json`, then `npm install` again |

---

## 📝 Project Dependencies Overview

### Frontend (React):
- React 19
- React Router 7
- Tailwind CSS
- Shadcn/ui Components
- Axios (HTTP requests)
- React Hook Form

### Backend (Python):
- FastAPI (Web framework)
- Uvicorn (Server)
- Motor (MongoDB driver)
- Pydantic (Data validation)
- Pytest (Testing)

### Database:
- MongoDB (Optional - uses in-memory if not available)

---

## 🧪 Testing (Optional)

```bash
cd backend
# Activate venv first
python -m pytest tests/backend_test.py -v

# Should pass 9 tests ✓
```

---

## ✅ Complete Checklist

- [ ] Node.js installed & verified
- [ ] Python installed & verified  
- [ ] Project downloaded
- [ ] Backend setup complete (venv + requirements installed)
- [ ] .env file created
- [ ] Frontend setup complete (npm install)
- [ ] Backend starts on port 8001 ✓
- [ ] Frontend starts on port 3000 ✓
- [ ] Application opens at http://localhost:3000 ✓

---

## 🎯 You're Done!

**When all 3 terminals are running:**

1. Open http://localhost:3000
2. Enter a blog topic
3. Select tone and length
4. Click "Generate Blog"
5. Watch AI generate content in real-time! 🚀

---

## 📞 Need Help?

- **Detailed Guide**: See `SETUP_GUIDE.md`
- **Project Info**: See `PROJECT_DOCUMENTATION.md`
- **Backend API**: http://localhost:8001/docs
- **GitHub**: https://github.com/mohshaquib7/Smart-ai-blog-generator

---

**Estimated Time**: 15-30 minutes (depending on internet speed)

**Last Updated**: April 29, 2026
