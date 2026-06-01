@echo off
REM AI Super-Resolution Setup Script for Windows

echo.
echo ===================================
echo AI Image Super-Resolution Setup
echo ===================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Python and Node.js found
echo.

REM Setup Backend
echo ===================================
echo Setting up Backend...
echo ===================================
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo ✓ Backend setup complete!
echo Backend will run on http://127.0.0.1:5000
echo.

cd ..

REM Setup Frontend
echo ===================================
echo Setting up Frontend...
echo ===================================
cd frontend

echo Installing Node dependencies...
call npm install

echo.
echo ✓ Frontend setup complete!
echo Frontend will run on http://localhost:3000
echo.

cd ..

echo ===================================
echo Setup Complete!
echo ===================================
echo.
echo Next Steps:
echo.
echo 1. Open two terminal windows
echo.
echo 2. Terminal 1 - Run Backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python app.py
echo.
echo 3. Terminal 2 - Run Frontend:
echo    cd frontend
echo    npm start
echo.
echo 4. Frontend will automatically open at http://localhost:3000
echo.
echo Enjoy! 🎉
echo.
pause
