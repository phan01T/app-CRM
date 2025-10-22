import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ dùng ngModel cần cái này

interface Integration {
  id: number;
  icon: string;
  name: string;
  mode: string;
  connected: boolean;
  lastSync: string | null;
}

interface ImportRow {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface ActionButton {
  label: string;
  icon: string;
  color: 'primary' | 'suggest' | 'secondary';
  action: () => void;
}

@Component({
  selector: 'app-sync',
  standalone: true,
  // ✅ Đảm bảo FormsModule thực sự có mặt trong imports:
  imports: [CommonModule, FormsModule],
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss'],
})
export class SyncComponent {
  step = 1;
  tabs = ['Import', 'Mapping', 'Preview', 'Export'];
  fileName = '';

  setStep(s: number) {
    this.step = s;
  }

  onFileSelect(e: any) {
    const file = e.target.files[0];
    if (file) this.fileName = file.name;
  }

  data: ImportRow[] = [
    {
      firstName: 'Linh',
      lastName: 'Nguyen',
      email: 'linh@acme',
      phone: '+84 912 345 678',
    },
    {
      firstName: 'Huy',
      lastName: 'Pham',
      email: 'huy@globex.com',
      phone: '0912 888 777',
    },
    {
      firstName: 'Anh',
      lastName: 'Tran',
      email: 'anh.tran@',
      phone: '+84 97 222 3333',
    },
  ];

  mappingColumns = [
    { csv: 'first_name', field: 'First name' },
    { csv: 'last_name', field: 'Last name' },
    { csv: 'email', field: 'Email' },
    { csv: 'phone', field: 'Phone' },
  ];

  errorMessage =
    '3 lỗi cần xử lý: 2 email không hợp lệ, 1 số điện thoại thiếu mã quốc gia';

  exportOptions = {
    target: 'Customers',
    fields: 'Tất cả',
    format: 'CSV',
  };

  onExport() {
    this.logs.unshift({
      time: this.getNow(),
      message: `Xuất ${this.exportOptions.target} (${this.exportOptions.format})`,
      status: '✅ Thành công',
    });
  }

  onImport() {
    this.logs.unshift({
      time: this.getNow(),
      message: 'Nhập dữ liệu CSV thành công',
      status: '✅ 250 bản ghi',
    });
  }

  integrations: Integration[] = [
    {
      id: 1,
      icon: 'email',
      name: 'Email',
      mode: '2 chiều',
      connected: false,
      lastSync: null,
    },
    {
      id: 2,
      icon: 'web',
      name: 'Form web',
      mode: '1 chiều',
      connected: true,
      lastSync: '10:05',
    },
    {
      id: 3,
      icon: 'chat',
      name: 'Chatbot',
      mode: '2 chiều',
      connected: false,
      lastSync: null,
    },
    {
      id: 4,
      icon: 'point_of_sale',
      name: 'POS',
      mode: '1/2 chiều',
      connected: true,
      lastSync: 'Hôm qua',
    },
  ];

  toggleIntegration(i: Integration) {
    i.connected = !i.connected;
    i.lastSync = i.connected ? this.getNow() : null;

    this.logs.unshift({
      time: this.getNow(),
      message: i.connected ? `Kết nối ${i.name}` : `Ngắt kết nối ${i.name}`,
      status: i.connected ? '🟢 Đang hoạt động' : '🔴 Ngắt kết nối',
    });
  }

  logs = [
    {
      time: '10:20',
      message: 'Đã nhập 250 khách hàng',
      status: '✅ Thành công - 0 lỗi',
    },
    { time: '09:05', message: 'Export Customers', status: 'CSV • 1240 dòng' },
  ];

  getNow(): string {
    return new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  actions: ActionButton[] = [
    {
      label: 'Gợi ý',
      icon: 'lightbulb',
      color: 'suggest',
      action: () => this.onSuggest(),
    },
    {
      label: 'Tạo khách hàng',
      icon: 'person_add',
      color: 'primary',
      action: () => this.onCreateCustomer(),
    },
  ];

  onSuggest() {
    alert('💡 Gợi ý tự động: bạn có thể import khách hàng từ file CRM cũ.');
  }

  onCreateCustomer() {
    alert('🧾 Tạo khách hàng mới!');
  }
}
