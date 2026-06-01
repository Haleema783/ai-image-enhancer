#!/bin/bash

# Start script for AI Super-Resolution

echo ""
echo "==================================="
echo "Starting AI Super-Resolution App"
echo "==================================="
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down services..."
    pkill -P $$ 
}

trap cleanup EXIT

# Start Backend
echo "Starting Backend..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

# Wait a moment
sleep 3

# Start Frontend
echo "Starting Frontend..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo ""
echo "✓ Both services are starting!"
echo ""
echo "Backend: http://127.0.0.1:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Wait for all background processes
wait
