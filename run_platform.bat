@echo off
TITLE Multimodal Construction Intelligence Platform Launcher
COLOR 0A

echo =======================================================================
echo     MULTIMODAL CONSTRUCTION INTELLIGENCE PLATFORM (FULL STACK)
echo =======================================================================
echo.
echo [1/3] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Backend - FastAPI" cmd /k "cd /d %~dp0backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/3] Waiting 3 seconds for backend initialization...
timeout /t 3 /nobreak >nul

echo [3/3] Starting React.js Frontend on http://localhost:5173 ...
start "Frontend - Vite React" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo =======================================================================
echo Platform is launched!
echo - Frontend Dashboard: http://localhost:5173
echo - Backend API Docs:   http://127.0.0.1:8000/docs
echo =======================================================================
echo.
pause
