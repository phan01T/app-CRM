# 🐛 Khắc phục lỗi "ERR_CONNECTION_REFUSED"

## ❌ Vấn đề hiện tại:
- Lỗi: `ERR_CONNECTION_REFUSED` khi truy cập http://localhost:8080/api/leads
- Nguyên nhân: Backend chưa chạy hoặc chưa khởi động thành công

## 🔧 Các bước khắc phục:

### Bước 1: Kiểm tra Backend có chạy không
Mở Command Prompt và chạy:
```cmd
netstat -an | findstr :8080
```

**Kết quả:**
- Nếu thấy `:8080` → Backend đang chạy
- Nếu không thấy gì → Backend chưa chạy

### Bước 2: Chạy Backend

#### Cách 1: Sử dụng script fix (Khuyến nghị)
```cmd
cd D:\Projects\my-first-app
fix-backend.bat
```

#### Cách 2: Sử dụng script đơn giản
```cmd
cd D:\Projects\my-first-app
run-backend.bat
```

#### Cách 3: Chạy thủ công
```cmd
cd D:\Projects\my-first-app\backend\customer-profile-backend
mvn clean install
mvn spring-boot:run
```

### Bước 3: Kiểm tra kết quả

Khi backend chạy thành công, bạn sẽ thấy:
```
========================================
   CHAY BACKEND SPRING BOOT
========================================

Dang chuyen den thu muc backend...
Dang chay Spring Boot...

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.5.6)

2024-xx-xx xx:xx:xx.xxx  INFO --- [main] c.e.c.CustomerProfileBackendApplication : Starting CustomerProfileBackendApplication
2024-xx-xx xx:xx:xx.xxx  INFO --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http)
2024-xx-xx xx:xx:xx.xxx  INFO --- [main] c.e.c.CustomerProfileBackendApplication : Started CustomerProfileBackendApplication in x.xxx seconds
```

### Bước 4: Test API

Sau khi thấy message "Started CustomerProfileBackendApplication", test API:

1. **Mở browser** và vào: http://localhost:8080/api/leads
2. **Hoặc** mở file `test-api.html` trong browser
3. **Hoặc** chạy: `test-backend.bat`

## 🐛 Các lỗi thường gặp:

### Lỗi 1: "Java không tìm thấy"
**Giải pháp:**
- Cài đặt Java 21
- Kiểm tra JAVA_HOME

### Lỗi 2: "Maven không tìm thấy"
**Giải pháp:**
- Cài đặt Maven
- Thêm Maven vào PATH

### Lỗi 3: "Database connection failed"
**Giải pháp:**
- Kiểm tra MySQL đang chạy
- Kiểm tra database `customer_profile_db` đã tạo
- Kiểm tra username/password: root/123456

### Lỗi 4: "Port 8080 already in use"
**Giải pháp:**
- Tìm process đang dùng port 8080: `netstat -ano | findstr :8080`
- Kill process: `taskkill /PID <PID> /F`
- Hoặc thay đổi port trong application.properties

## ✅ Kiểm tra thành công:

Khi backend chạy thành công:
1. ✅ Port 8080 đang được sử dụng
2. ✅ Truy cập http://localhost:8080/api/leads thấy dữ liệu JSON
3. ✅ Console hiển thị "Started CustomerProfileBackendApplication"
4. ✅ Không có lỗi đỏ trong console

## 🎯 Sau khi Backend chạy thành công:

1. **Giữ cửa sổ backend mở** (đừng đóng)
2. **Mở terminal mới** để chạy frontend: `ng serve`
3. **Test**: Mở http://localhost:4200 và vào trang Leads

## 📞 Cần hỗ trợ?

Nếu vẫn gặp lỗi:
1. Chụp màn hình lỗi
2. Gửi log từ console
3. Mô tả các bước đã thực hiện
