#!/bin/bash

# AI Super-Resolution Setup Script for Linux/Mac

echo ""
echo "==================================="
echo "AI Image Super-Resolution Setup"
echo "==================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null
then
    echo "ERROR: Python3 is not installed"
    echo "Please install Python3 first"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Python3 and Node.js found"
echo ""

# Setup Backend
echo "==================================="
echo "Setting up Backend..."
echo "==================================="
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "✓ Backend setup complete!"
echo "Backend will run on http://127.0.0.1:5000"
echo ""

cd ..

# Setup Frontend
echo "==================================="
echo "Setting up Frontend..."
echo "==================================="
cd frontend

echo "Installing Node dependencies..."
npm install

echo ""
echo "✓ Frontend setup complete!"
echo "Frontend will run on http://localhost:3000"
echo ""

cd ..

echo "==================================="
echo "Setup Complete!"
echo "==================================="
echo ""
echo "Next Steps:"
echo ""
echo "1. Open two terminal windows"
echo ""
echo "2. Terminal 1 - Run Backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python app.py"
echo ""
echo "3. Terminal 2 - Run Frontend:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Frontend will automatically open at http://localhost:3000"
echo ""
echo "Enjoy! 🎉"
echo ""
