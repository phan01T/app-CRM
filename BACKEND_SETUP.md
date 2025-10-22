# Hướng dẫn chạy Backend cho Leads Component

## Yêu cầu hệ thống
1. **Java 21** - Đã cài đặt
2. **Maven** - Đã cài đặt  
3. **MySQL** - Cần cài đặt và cấu hình

## Cài đặt MySQL

### Bước 1: Tải và cài đặt MySQL
1. Tải MySQL Community Server từ: https://dev.mysql.com/downloads/mysql/
2. Cài đặt với cấu hình:
   - Username: `root`
   - Password: `123456`
   - Port: `3306`

### Bước 2: Tạo database
```sql
CREATE DATABASE customer_profile_db;
```

### Bước 3: Cấu hình MySQL
- Đảm bảo MySQL service đang chạy
- Kiểm tra port 3306 đang mở

## Chạy Backend

### Cách 1: Sử dụng script batch
```bash
# Chạy file start-backend.bat
start-backend.bat
```

### Cách 2: Chạy thủ công
```bash
cd backend/customer-profile-backend
mvn clean install
mvn spring-boot:run
```

## Kiểm tra Backend

### Backend sẽ chạy trên:
- URL: http://localhost:8080
- API Leads: http://localhost:8080/api/leads

### Test API bằng curl:
```bash
# Lấy danh sách leads
curl http://localhost:8080/api/leads

# Tạo lead mới
curl -X POST http://localhost:8080/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Lead","company":"Test Company","email":"test@example.com","phone":"0901234567","status":"Mới","value":1000000,"owner":"Test Owner"}'
```

## Cấu hình Frontend

Frontend đã được cấu hình để kết nối với backend:
- API URL: `http://localhost:8080/api/leads`
- CORS đã được enable cho tất cả origins

## Troubleshooting

### Lỗi kết nối database:
- Kiểm tra MySQL đang chạy
- Kiểm tra username/password trong application.properties
- Kiểm tra database `customer_profile_db` đã tồn tại

### Lỗi port 8080:
- Kiểm tra port 8080 có bị chiếm dụng không
- Thay đổi port trong application.properties nếu cần

### Lỗi CORS:
- Backend đã cấu hình `@CrossOrigin(origins = "*")`
- Kiểm tra frontend đang chạy trên port khác (thường là 4200)
