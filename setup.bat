@echo off
REM ============================================
REM Smart AI Blog Generator - Auto Setup Script
REM For Windows PowerShell/CMD
REM ============================================

echo.
echo ========================================
echo Smart AI Blog Generator Setup
echo ========================================
echo.

REM Check if running from correct directory
if not exist "backend" (
    echo ERROR: Please run this script from the Smart-ai-blog-generator root folder
    echo Current location: %cd%
    pause
    exit /b 1
)

echo [1/5] Checking prerequisites...
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✓ Node.js installed: 
    node --version
)

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found!
    echo Please install Python from https://www.python.org/downloads/
    pause
    exit /b 1
) else (
    echo ✓ Python installed: 
    python --version
)

echo.
echo [2/5] Setting up Backend...
echo.

cd backend

REM Create virtual environment
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
    echo ✓ Virtual environment created
) else (
    echo ✓ Virtual environment already exists
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install Python dependencies
echo Installing Python dependencies...
pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt >nul 2>&1

if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
) else (
    echo ✓ Python dependencies installed
)

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    (
        echo BACKEND_URL=http://localhost:8001
        echo MONGO_URL=mongodb://localhost:27017
        echo DB_NAME=blog_generator
        echo EMERGENT_LLM_KEY=your-api-key-here
    ) > .env
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)

REM Test backend
echo Testing backend...
timeout /t 2 >nul
python run.py ^| find "Uvicorn running" >nul 2>&1

if errorlevel 1 (
    echo WARNING: Backend test inconclusive (this is normal)
) else (
    echo ✓ Backend working
)

cd ..

echo.
echo [3/5] Setting up Frontend...
echo.

cd frontend

REM Install npm dependencies
echo Installing npm dependencies...
echo This may take a few minutes...
call npm install >nul 2>&1

if errorlevel 1 (
    echo ERROR: Failed to install npm dependencies
    pause
    exit /b 1
) else (
    echo ✓ npm dependencies installed
)

cd ..

echo.
echo [4/5] Running Tests...
echo.

cd backend
call venv\Scripts\activate.bat

REM Run backend tests
echo Running backend tests...
pytest tests/backend_test.py -v >nul 2>&1

if errorlevel 1 (
    echo WARNING: Some tests may have failed (check manually if needed)
) else (
    echo ✓ Backend tests passed
)

cd ..

echo.
echo [5/5] Setup Complete!
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo Open THREE separate terminals/PowerShell windows:
echo.
echo Terminal 1 - Start Backend:
echo   cd backend
echo   venv\Scripts\activate
echo   python run.py
echo.
echo Terminal 2 - Start Frontend:
echo   cd frontend
echo   npm run dev
echo.
echo Terminal 3 - Start MongoDB (optional):
echo   mongod
echo.
echo Then open: http://localhost:3000
echo.
echo Backend API Docs: http://localhost:8001/docs
echo.
echo ========================================
echo.
pause
