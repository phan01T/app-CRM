@echo off
echo ========================================
echo    TEST BACKEND CONNECTION
echo ========================================
echo.

echo Dang kiem tra backend co chay khong...
echo.

echo Test 1: Kiem tra port 8080
netstat -an | findstr :8080
if %errorlevel% equ 0 (
    echo ✅ Port 8080 dang duoc su dung - Backend co the dang chay
) else (
    echo ❌ Port 8080 khong duoc su dung - Backend chua chay
)

echo.
echo Test 2: Test API endpoint
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/leads' -Method GET -TimeoutSec 5; Write-Host '✅ API tra ve:' $response.StatusCode; Write-Host $response.Content } catch { Write-Host '❌ Loi ket noi:' $_.Exception.Message }"

echo.
echo Test 3: Test database connection
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080/api/leads' -Method GET -TimeoutSec 5; if ($response.StatusCode -eq 200) { Write-Host '✅ Backend va database ket noi thanh cong!' } else { Write-Host '❌ Backend chay nhung co loi:' $response.StatusCode } } catch { Write-Host '❌ Backend chua chay hoac co loi ket noi' }"

echo.
pause
