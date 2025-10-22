import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Invoice {
  customer: string;
  code: string;
  amount: string;
  dueDate: string;
  status: 'Đã thanh toán' | 'Quá hạn' | 'Đang chờ';
}
interface User {
  name: string;
  email: string;
  role: string;
  status: 'Hoạt động' | 'Tạm khóa';
}
interface Item {
  desc: string;
  qty: number;
  price: number;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent {
  invoices = signal<Invoice[]>([
    {
      customer: 'ACME Corp',
      code: 'INV-001',
      amount: '$3,000',
      dueDate: '2025-10-15',
      status: 'Đang chờ',
    },
  ]);

  users = signal<User[]>([
    {
      name: 'Lan Phạm',
      email: 'lan@company.com',
      role: 'Quản trị',
      status: 'Hoạt động',
    },
  ]);

  filterStatus = signal<'Tất cả' | 'Đã thanh toán' | 'Quá hạn' | 'Đang chờ'>(
    'Tất cả'
  );

  filteredInvoices = computed(() => {
    const f = this.filterStatus();
    return f === 'Tất cả'
      ? this.invoices()
      : this.invoices().filter((i) => i.status === f);
  });

  // === Dynamic Modal States ===
  showCreateInvoice = false;
  showCreateUser = false;

  // Dynamic data
  newInvoice = {
    customer: '',
    dueDate: '',
    items: [{ desc: '', qty: 1, price: 0 }] as Item[],
  };
  newUser = { name: '', email: '', role: 'Kế toán' };

  settings = {
    template: 'Tối giản',
    currency: 'VND',
    autoReminder: true,
    language: 'Tiếng Việt',
    smtp: 'noreply@company.com',
    pdf: 'Chuẩn A4',
  };

  // === ACTIONS ===
  openCreateModal() {
    this.showCreateInvoice = true;
  }
  openUserModal() {
    this.showCreateUser = true;
  }
  closeModals() {
    this.showCreateInvoice = this.showCreateUser = false;
  }

  addItem() {
    this.newInvoice.items.push({ desc: '', qty: 1, price: 0 });
  }
  removeItem(i: number) {
    this.newInvoice.items.splice(i, 1);
  }

  calcTotal() {
    return this.newInvoice.items.reduce(
      (sum, it) => sum + it.qty * it.price,
      0
    );
  }

  createInvoice() {
    if (!this.newInvoice.customer) return alert('⚠️ Nhập tên khách hàng!');
    const total =
      this.calcTotal().toLocaleString() + ' ' + this.settings.currency;
    this.invoices.update((list) => [
      ...list,
      {
        customer: this.newInvoice.customer,
        code: 'INV-' + (Math.floor(Math.random() * 900) + 100),
        amount: total,
        dueDate: this.newInvoice.dueDate,
        status: 'Đang chờ',
      },
    ]);
    this.closeModals();
  }

  addUser() {
    if (!this.newUser.name || !this.newUser.email)
      return alert('⚠️ Nhập đầy đủ thông tin!');
    this.users.update((list) => [
      ...list,
      { ...this.newUser, status: 'Hoạt động' },
    ]);
    this.closeModals();
  }

  viewInvoice(code: string) {
    alert(`👁️ Xem chi tiết hóa đơn ${code}`);
  }
  remindInvoice(code: string) {
    alert(`📩 Đã gửi nhắc nhở thanh toán cho ${code}`);
  }
  sendPendingInvoice(code: string) {
    alert(`📤 Gửi hóa đơn ${code} cho khách hàng`);
  }
}
