#!/bin/bash

# ============================================
# Smart AI Blog Generator - Auto Setup Script
# For macOS/Linux (Bash)
# ============================================

echo ""
echo "========================================"
echo "Smart AI Blog Generator Setup"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from correct directory
if [ ! -d "backend" ]; then
    echo -e "${RED}ERROR: Please run this script from the Smart-ai-blog-generator root folder${NC}"
    echo "Current location: $(pwd)"
    exit 1
fi

echo "[1/5] Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js not found!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
else
    echo -e "${GREEN}✓ Node.js installed:${NC}"
    node --version
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERROR: Python3 not found!${NC}"
    echo "Please install Python from https://www.python.org/downloads/"
    exit 1
else
    echo -e "${GREEN}✓ Python installed:${NC}"
    python3 --version
fi

echo ""
echo "[2/5] Setting up Backend..."
echo ""

cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo -e "${RED}ERROR: Failed to create virtual environment${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Virtual environment created${NC}"
else
    echo -e "${GREEN}✓ Virtual environment already exists${NC}"
fi

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Failed to install Python dependencies${NC}"
    exit 1
else
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
BACKEND_URL=http://localhost:8001
MONGO_URL=mongodb://localhost:27017
DB_NAME=blog_generator
EMERGENT_LLM_KEY=your-api-key-here
EOF
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

# Deactivate venv (we'll activate it again in instructions)
deactivate

cd ..

echo ""
echo "[3/5] Setting up Frontend..."
echo ""

cd frontend

# Install npm dependencies
echo "Installing npm dependencies..."
echo "This may take a few minutes..."
npm install > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Failed to install npm dependencies${NC}"
    exit 1
else
    echo -e "${GREEN}✓ npm dependencies installed${NC}"
fi

cd ..

echo ""
echo "[4/5] Running Tests..."
echo ""

cd backend
source venv/bin/activate

# Run backend tests
echo "Running backend tests..."
pytest tests/backend_test.py -v > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}WARNING: Some tests may have failed (check manually if needed)${NC}"
else
    echo -e "${GREEN}✓ Backend tests passed${NC}"
fi

deactivate
cd ..

echo ""
echo "[5/5] Setup Complete!"
echo ""
echo "========================================"
echo "NEXT STEPS:"
echo "========================================"
echo ""
echo "Open THREE separate terminal windows:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python run.py"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Terminal 3 - Start MongoDB (optional):"
echo "  mongod"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Backend API Docs: http://localhost:8001/docs"
echo ""
echo "========================================"
echo ""
