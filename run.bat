@echo off
REM Techno Cars - Development Helper Script
REM This script provides quick access to common npm commands

setlocal enabledelayedexpansion

:menu
cls
echo.
echo ========================================
echo     TECHNO CARS - Development Menu
echo ========================================
echo.
echo 1. Start Development Server (npm run dev)
echo 2. Build for Production (npm run build)
echo 3. Start Production Server (npm start)
echo 4. Run Linting (npm run lint)
echo 5. Install Dependencies (npm install)
echo 6. Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    echo.
    echo Starting development server...
    call npm run dev
) else if "%choice%"=="2" (
    echo.
    echo Building for production...
    call npm run build
) else if "%choice%"=="3" (
    echo.
    echo Starting production server...
    call npm start
) else if "%choice%"=="4" (
    echo.
    echo Running linting...
    call npm run lint
) else if "%choice%"=="5" (
    echo.
    echo Installing dependencies...
    call npm install
) else if "%choice%"=="6" (
    exit /b 0
) else (
    echo Invalid choice. Please try again.
    timeout /t 2
    goto menu
)

echo.
set /p again="Would you like to return to menu? (y/n): "
if /i "%again%"=="y" goto menu
exit /b 0
