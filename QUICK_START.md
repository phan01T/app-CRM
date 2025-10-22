# 🚀 Hướng dẫn nhanh chạy Backend cho Leads

## ✅ Đã hoàn thành:
1. ✅ Sửa API URL trong leads.component.ts từ `/api/customers` → `/api/leads`
2. ✅ Cấu hình database trong application.properties
3. ✅ Tạo script chạy backend

## 🔧 Các bước thực hiện:

### 1. Cài đặt MySQL (nếu chưa có)
```bash
# Tải MySQL từ: https://dev.mysql.com/downloads/mysql/
# Cài đặt với:
# - Username: root
# - Password: 123456
# - Port: 3306
```

### 2. Tạo database
```sql
CREATE DATABASE customer_profile_db;
```

### 3. Chạy Backend
Mở Command Prompt hoặc PowerShell và chạy:

```bash
# Cách 1: Sử dụng script
start-backend.bat

# Cách 2: Chạy thủ công
cd backend\customer-profile-backend
mvn spring-boot:run
```

### 4. Chạy Frontend
```bash
# Terminal khác
ng serve
```

## 🌐 Kiểm tra hoạt động:

### Backend API:
- http://localhost:8080/api/leads (GET, POST, PUT, DELETE)

### Frontend:
- http://localhost:4200
- Vào trang Leads để test

## 📋 API Endpoints có sẵn:

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | /api/leads | Lấy danh sách leads |
| GET | /api/leads/{id} | Lấy lead theo ID |
| POST | /api/leads | Tạo lead mới |
| PUT | /api/leads/{id} | Cập nhật lead |
| DELETE | /api/leads/{id} | Xóa lead |

## 🐛 Troubleshooting:

### Lỗi kết nối database:
- Kiểm tra MySQL đang chạy
- Kiểm tra database `customer_profile_db` đã tạo
- Kiểm tra username/password: root/123456

### Lỗi port 8080:
- Kiểm tra port có bị chiếm dụng không
- Thay đổi port trong application.properties

### Lỗi Maven:
- Chạy: `mvn clean install` trước
- Kiểm tra Java 21 đã cài đặt

## 📊 Dữ liệu mẫu:
Backend sẽ tự động tạo 3 leads mẫu khi khởi động lần đầu.
