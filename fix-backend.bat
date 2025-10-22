@echo off
echo ========================================
echo    KHAC PHUC LOI BACKEND
echo ========================================
echo.

echo 1. Kiem tra port 8080...
netstat -an | findstr :8080
if %errorlevel% equ 0 (
    echo ✅ Port 8080 dang duoc su dung
    echo Backend co the dang chay, nhung co the co loi
) else (
    echo ❌ Port 8080 khong duoc su dung
    echo Backend chua chay hoac chua khoi dong thanh cong
)

echo.
echo 2. Kiem tra Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java khong tim thay! Vui long cai dat Java 21
    pause
    exit /b 1
) else (
    echo ✅ Java da cai dat
)

echo.
echo 3. Kiem tra Maven...
mvn --version
if %errorlevel% neq 0 (
    echo ❌ Maven khong tim thay! Vui long cai dat Maven
    pause
    exit /b 1
) else (
    echo ✅ Maven da cai dat
)

echo.
echo 4. Kiem tra thu muc backend...
if exist "backend\customer-profile-backend" (
    echo ✅ Thu muc backend ton tai
) else (
    echo ❌ Thu muc backend khong ton tai!
    pause
    exit /b 1
)

echo.
echo 5. Chuyen den thu muc backend...
cd /d "%~dp0backend\customer-profile-backend"

echo.
echo 6. Kiem tra file pom.xml...
if exist "pom.xml" (
    echo ✅ File pom.xml ton tai
) else (
    echo ❌ File pom.xml khong ton tai!
    pause
    exit /b 1
)

echo.
echo 7. Chay Maven clean install...
echo Dang chay: mvn clean install
mvn clean install
if %errorlevel% neq 0 (
    echo ❌ Maven clean install that bai!
    pause
    exit /b 1
)

echo.
echo 8. Chay Spring Boot...
echo Dang chay: mvn spring-boot:run
echo Backend se chay tren: http://localhost:8080
echo API Leads: http://localhost:8080/api/leads
echo.
echo Nhan Ctrl+C de dung backend
echo.

mvn spring-boot:run

echo.
echo Backend da dung.
pause
