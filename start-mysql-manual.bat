@echo off
echo ========================================
echo    HUONG DAN KHOI DONG MYSQL
echo ========================================
echo.

echo MySQL service khong chay!
echo.
echo CACH 1: Khoi dong bang Services
echo 1. Nhan Windows + R
echo 2. Go: services.msc
echo 3. Tim "MySQL" trong danh sach
echo 4. Right-click va chon "Start"
echo.

echo CACH 2: Khoi dong bang MySQL Workbench
echo 1. Mo MySQL Workbench
echo 2. Ket noi voi database
echo 3. MySQL se tu dong khoi dong
echo.

echo CACH 3: Khoi dong bang Command Prompt (as Administrator)
echo 1. Mo Command Prompt as Administrator
echo 2. Chay: net start mysql
echo.

echo CACH 4: Khoi dong bang PowerShell (as Administrator)
echo 1. Mo PowerShell as Administrator
echo 2. Chay: Start-Service mysql
echo.

echo ========================================
echo    SAU KHI MYSQL CHAY
echo ========================================
echo.
echo Sau khi MySQL chay thanh cong:
echo 1. Chay: .\test-database.bat
echo 2. Chay: .\start-backend-wait.bat
echo.

pause
