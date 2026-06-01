@echo off
REM Start script for AI Super-Resolution

echo.
echo ===================================
echo Starting AI Super-Resolution App
echo ===================================
echo.

REM Start Backend in one window
echo Starting Backend...
start cmd /k "cd backend && venv\Scripts\activate.bat && python app.py"

REM Wait a moment
timeout /t 3 /nobreak

REM Start Frontend in another window
echo Starting Frontend...
start cmd /k "cd frontend && npm start"

echo.
echo ✓ Both services are starting!
echo.
echo Backend: http://127.0.0.1:5000
echo Frontend: http://localhost:3000
echo.
echo Frontend will automatically open in your browser.
echo.
