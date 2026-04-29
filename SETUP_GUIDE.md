# 🚀 Complete Setup Guide for Smart AI Blog Generator

**Purpose**: Install all dependencies and set up the project on a new laptop

---

## 📋 Prerequisites Checklist

Before you start, ensure you have:
- ✅ Administrator access on your laptop
- ✅ Internet connection (for downloading packages)
- ✅ At least 2GB free disk space
- ✅ A code editor (VS Code recommended)

---

## 🖥️ System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **OS** | Windows 10, macOS 10.15, Ubuntu 18.04 | Windows 11, macOS 12+, Ubuntu 20.04+ |
| **RAM** | 4GB | 8GB+ |
| **Disk** | 2GB | 5GB+ |
| **Node.js** | 16.x | 18.x LTS or newer |
| **Python** | 3.10 | 3.11+ |

---

## 📦 What Will Be Installed

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18+ LTS | Frontend package management & runtime |
| **npm** | 9+ | Package manager (comes with Node.js) |
| **Python** | 3.10+ | Backend runtime |
| **pip** | Latest | Python package manager |
| **Git** | Latest | Version control (optional but recommended) |
| **MongoDB** | Latest | Database (optional, can use in-memory) |

---

## 🔧 Installation Steps

### **STEP 1: Install Node.js (for Frontend)**

#### Windows:
1. Visit: https://nodejs.org/
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow prompts
4. Accept all defaults
5. Restart your computer

#### macOS:
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
```

#### Linux (Ubuntu/Debian):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

---

### **STEP 2: Install Python (for Backend)**

#### Windows:
1. Visit: https://www.python.org/downloads/
2. Download **Python 3.11** or higher
3. Run installer
4. ⚠️ **IMPORTANT**: Check "Add Python to PATH"
5. Click "Install Now"
6. Restart your computer

#### macOS:
```bash
# Using Homebrew (recommended)
brew install python3

# Or download from https://www.python.org/downloads/
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

**Verify Installation:**
```bash
python --version      # Should show Python 3.10+
python -m pip --version  # Should show pip version
```

---

### **STEP 3: Install Git (Optional but Recommended)**

#### Windows:
1. Download from: https://git-scm.com/download/win
2. Run installer and accept defaults
3. Restart terminal/VS Code

#### macOS:
```bash
brew install git
```

#### Linux:
```bash
sudo apt install git
```

**Verify Installation:**
```bash
git --version
```

---

### **STEP 4: Clone or Download the Project**

#### Option A: Using Git (Recommended)
```bash
# Navigate to where you want the project
cd Desktop  # or any folder

# Clone the repository
git clone https://github.com/mohshaquib7/Smart-ai-blog-generator.git

# Enter project directory
cd Smart-ai-blog-generator
```

#### Option B: Manual Download
1. Visit: https://github.com/mohshaquib7/Smart-ai-blog-generator
2. Click **Code** → **Download ZIP**
3. Extract to your desired location
4. Navigate to the folder

---

### **STEP 5: Setup Backend (FastAPI)**

#### 5a. Open Terminal in Backend Folder
```bash
cd Smart-ai-blog-generator/backend
```

#### 5b. Create Virtual Environment

**Windows (PowerShell or CMD):**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt

#### 5c. Install Python Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Expected packages to install:**
- FastAPI (web framework)
- Uvicorn (server)
- Motor (MongoDB driver)
- Pydantic (data validation)
- python-dotenv (environment variables)
- pytest (testing)

#### 5d. Create .env File
Create a file named `.env` in the `backend/` folder:

**Windows (using Notepad):**
```
Right-click in backend folder → New → Text Document → Rename to .env
```

**macOS/Linux (using terminal):**
```bash
cat > .env << EOF
# Server Configuration
BACKEND_URL=http://localhost:8001

# Database Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=blog_generator

# LLM Configuration
EMERGENT_LLM_KEY=your-api-key-here
EOF
```

**Content to add:**
```env
BACKEND_URL=http://localhost:8001
MONGO_URL=mongodb://localhost:27017
DB_NAME=blog_generator
EMERGENT_LLM_KEY=your-api-key-here
```

#### 5e. Verify Backend Setup
```bash
# Test the backend starts
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8001
```

Press `Ctrl+C` to stop

---

### **STEP 6: Setup Frontend (React)**

#### 6a. Open New Terminal in Frontend Folder
```bash
# In a NEW terminal/tab
cd Smart-ai-blog-generator/frontend
```

#### 6b. Install Node Packages
```bash
npm install
```

This will install all React and UI dependencies (~500MB)

**Expected packages:**
- React 19
- React Router 7
- Tailwind CSS
- Axios
- Shadcn/ui components
- And many more...

#### 6c. Verify Frontend Setup
```bash
npm run dev
```

You should see:
```
webpack compiled successfully
Local:   http://localhost:3000
```

Press `Ctrl+C` to stop

---

### **STEP 7: Install MongoDB (Optional but Recommended)**

If you want persistent database storage:

#### Windows:
1. Visit: https://www.mongodb.com/try/download/community
2. Download **Community Server**
3. Run installer and accept defaults
4. Choose **Install MongoDB as a Service**
5. Complete installation

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu):
```bash
curl https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod
```

**Verify MongoDB:**
```bash
# Should connect successfully
mongosh  # or mongo (depending on version)
exit
```

---

## ✅ Running the Project

Now that everything is installed, here's how to run it:

### Terminal 1: Backend Server
```bash
cd Smart-ai-blog-generator/backend

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (macOS/Linux)
source venv/bin/activate

# Start backend
python run.py

# Should show: Uvicorn running on http://0.0.0.0:8001
```

### Terminal 2: Frontend Dev Server
```bash
cd Smart-ai-blog-generator/frontend
npm run dev

# Should show: webpack compiled successfully
#             Local: http://localhost:3000
```

### Terminal 3 (Optional): MongoDB (if installed)
```bash
mongod

# Should show: waiting for connections on port 27017
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8001
- **API Docs**: http://localhost:8001/docs

---

## 🧪 Testing (Optional)

### Test Backend
```bash
cd Smart-ai-blog-generator/backend

# Activate virtual environment first
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Run tests
pytest tests/backend_test.py -v

# Should pass all 9 tests ✓
```

---

## 🛠️ Troubleshooting

### Issue: "python command not found" (Windows)
**Solution:**
1. Add Python to PATH:
   - Search "Environment Variables" in Windows
   - Click "Edit the system environment variables"
   - Click "Environment Variables"
   - Under "System variables", find or create "PATH"
   - Add: `C:\Users\YourUsername\AppData\Local\Programs\Python\Python311`
2. Restart terminal

### Issue: "npm command not found"
**Solution:**
- Restart your computer (Node.js installation requires it)
- Or reinstall Node.js

### Issue: "Backend won't connect on port 8001"
**Solution:**
```bash
# Check if port is in use
# Windows (PowerShell):
netstat -ano | findstr :8001

# Kill process using port
# Windows (PowerShell as Admin):
taskkill /PID <PID> /F

# Then start backend again
python run.py
```

### Issue: "venv\Scripts\activate doesn't work"
**Solution:**
Make sure you're in the `backend` folder first:
```bash
cd Smart-ai-blog-generator/backend
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # macOS/Linux
```

### Issue: "Module not found" errors when running backend
**Solution:**
```bash
# Make sure venv is activated
# Then reinstall requirements
pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: "MongoDB connection error" 
**Solution:**
- MongoDB is optional - the app has in-memory storage fallback
- Blogs will be stored during session but not persist after restart
- To use MongoDB, make sure `mongod` is running in Terminal 3

---

## 📝 Project Structure After Setup

```
Smart-ai-blog-generator/
├── backend/
│   ├── venv/                    ← Virtual environment (auto-created)
│   ├── .env                     ← Environment file (you created)
│   ├── server.py
│   ├── run.py
│   ├── requirements.txt
│   ├── emergentintegrations/
│   └── tests/
│
├── frontend/
│   ├── node_modules/            ← All npm packages (auto-downloaded)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── README.md
└── PROJECT_DOCUMENTATION.md
```

---

## 🎯 Quick Start Checklist

- [ ] Node.js installed and verified
- [ ] Python installed and verified
- [ ] Project cloned/downloaded
- [ ] Backend virtual environment created
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created in backend folder
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend tested (`python run.py`)
- [ ] Frontend tested (`npm run dev`)
- [ ] MongoDB installed (optional)
- [ ] All 3 terminals running successfully

---

## 🚀 Ready to Code!

Once all steps are complete:
1. Keep all 3 terminals running
2. Open http://localhost:3000 in your browser
3. Start generating blogs!
4. Check http://localhost:8001/docs for API documentation

---

## 📞 Support

If you encounter issues:
1. Check the "Troubleshooting" section above
2. Verify all prerequisites are installed
3. Ensure all terminals are running
4. Check that ports 3000, 8001 are not in use
5. Restart your computer if issues persist

---

## 📚 Additional Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Python Docs**: https://www.python.org/doc/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **MongoDB Docs**: https://docs.mongodb.com/

---

**Created**: April 2026  
**For**: Complete Project Setup on New Laptop  
**Last Updated**: April 29, 2026
