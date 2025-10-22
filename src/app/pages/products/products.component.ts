import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/* ===============================
   🧩 KHAI BÁO KIỂU DỮ LIỆU
   =============================== */
interface Product {
  id: number;
  name: string;
  sku: string;
  desc: string;
  price: string;
  status: 'Đang bán' | 'Ngừng bán';
  selected?: boolean;
}

interface ColumnOption {
  key: string;
  label: string;
  visible: boolean;
}

interface Schedule {
  id: number;
  dateTime: string;
  action: string;
  status: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  constructor(private http: HttpClient) {}

  /* ===============================
     📦 DỮ LIỆU SẢN PHẨM
     =============================== */
  products: Product[] = [
    {
      id: 1,
      name: 'CRM Plus',
      sku: 'CRM-001',
      desc: 'Gói CRM tiêu chuẩn',
      price: '$49/tháng',
      status: 'Đang bán',
    },
    {
      id: 2,
      name: 'Support Desk',
      sku: 'SUP-010',
      desc: 'Dịch vụ hỗ trợ khách hàng',
      price: '$15/tháng',
      status: 'Ngừng bán',
    },
  ];

  /* ===============================
     📊 BỘ LỌC & CỘT
     =============================== */
  categories = ['Tất cả', 'SaaS', 'Dịch vụ', 'Add-on'];
  selectedCategory = 'Tất cả';

  columns: ColumnOption[] = [
    { key: 'name', label: 'Tên sản phẩm', visible: true },
    { key: 'desc', label: 'Mô tả', visible: true },
    { key: 'sku', label: 'SKU', visible: true },
    { key: 'price', label: 'Giá', visible: true },
    { key: 'status', label: 'Trạng thái', visible: true },
  ];

  toggleColumn(col: ColumnOption) {
    col.visible = !col.visible;
  }

  filterProducts(): Product[] {
    if (this.selectedCategory === 'Tất cả') return this.products;
    return this.products.filter((p) => p.desc.includes(this.selectedCategory));
  }

  /* ===============================
     🗓 LÊN LỊCH GỬI EMAIL
     =============================== */
  schedules: Schedule[] = [];
  showScheduleModal = false;
  scheduleDate = '';
  scheduleTime = '';

  openScheduleModal() {
    this.scheduleDate = '';
    this.scheduleTime = '';
    this.showScheduleModal = true;
  }

  closeScheduleModal() {
    this.showScheduleModal = false;
  }

  saveSchedule() {
    if (!this.scheduleDate || !this.scheduleTime) {
      alert('⚠️ Vui lòng chọn ngày và giờ!');
      return;
    }

    const newSchedule: Schedule = {
      id: Date.now(),
      dateTime: `${this.scheduleDate}T${this.scheduleTime}`,
      action: 'Gửi email sản phẩm',
      status: 'Đang chờ',
    };

    this.http
      .post('http://localhost:8080/api/schedule', newSchedule)
      .subscribe({
        next: () => {
          this.schedules.push(newSchedule);
          alert(`✅ Đã tạo lịch gửi email vào ${newSchedule.dateTime}`);
          this.closeScheduleModal();
        },
        error: () => alert('❌ Không thể tạo lịch'),
      });
  }

  /* ===============================
     ➕ TẠO / 🗑 XÓA SẢN PHẨM
     =============================== */
  showModal = false;
  newProduct: Product = {
    id: 0,
    name: '',
    sku: '',
    desc: '',
    price: '',
    status: 'Đang bán',
  };

  openCreateModal() {
    this.showModal = true;
  }

  closeCreateModal() {
    this.showModal = false;
  }

  saveNewProduct() {
    const newItem = { ...this.newProduct, id: Date.now() };
    this.products.push(newItem);
    this.closeCreateModal();
  }

  deleteProduct(id: number) {
    if (confirm('🗑 Xóa sản phẩm này?')) {
      this.products = this.products.filter((p) => p.id !== id);
    }
  }

  /* ===============================
     📧 GỬI EMAIL
     =============================== */
  sendEmail() {
    const selected = this.products.filter((p) => p.selected);
    if (selected.length === 0) {
      alert('⚠️ Vui lòng chọn ít nhất 1 sản phẩm!');
      return;
    }

    this.http
      .post('http://localhost:8080/api/email/send', {
        subject: 'Thông tin sản phẩm mới',
        message: 'Gửi danh sách sản phẩm tới khách hàng.',
        products: selected,
      })
      .subscribe({
        next: () => alert('✅ Email đã được gửi!'),
        error: () => alert('❌ Gửi email thất bại!'),
      });
  }
}
