import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailMessage, EmailRecipient } from './email.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
  // Signal lưu danh sách email
  private readonly _emails = signal<EmailMessage[]>([]);

  // Public computed để các component subscribe
  readonly emails = computed(() => this._emails());

  constructor(private http: HttpClient) {}

  // ✅ Giả lập fetch từ API (hoặc có thể đổi thành URL thật)
  async loadEmails() {
    // Bạn có thể thay URL này bằng API backend thật
    // Ví dụ: const res = await firstValueFrom(this.http.get<EmailMessage[]>('/api/emails'));
    const res: EmailMessage[] = [
      {
        id: 1,
        from: 'sales@company.com',
        sendAs: 'Nhóm Kinh doanh',
        owner: 'Sales VN',
        to: [{ name: 'Quang Tran', email: 'q.tran@beta.io' }],
        subject: 'Hóa đơn #INV-2043',
        body: 'Đính kèm hóa đơn tháng 3.',
        trackingEnabled: true,
        schedule: 'Ngay',
        status: 'Đã gửi',
        createdAt: new Date('2025-03-10T08:00:00'),
      },
      {
        id: 2,
        from: 'sales@company.com',
        sendAs: 'Nhóm Kinh doanh',
        owner: 'Nhóm Hà Nội',
        to: [{ name: 'Ava Pham', email: 'ava@delta.co' }],
        subject: 'Chào mừng đến với ACME CRM',
        body: 'Chào mừng bạn đến hệ thống CRM của chúng tôi.',
        trackingEnabled: true,
        schedule: 'Ngay',
        status: 'Đã gửi',
        createdAt: new Date('2025-03-09T09:30:00'),
      },
    ];

    this._emails.set(res);
  }

  // ✅ Thêm email mới
  addEmail(newEmail: EmailMessage) {
    this._emails.update((list) => [newEmail, ...list]);
  }

  // ✅ Xóa email
  deleteEmail(id: number) {
    this._emails.update((list) => list.filter((e) => e.id !== id));
  }

  // ✅ Lấy tất cả email
  getAll(): EmailMessage[] {
    return this._emails();
  }

  // ✅ Tạo email mới (dạng factory)
  createEmptyEmail(): EmailMessage {
    return {
      id: Date.now(),
      from: 'sales@company.com',
      sendAs: 'Nhóm Kinh doanh',
      owner: '',
      to: [],
      subject: '',
      body: '',
      attachments: [],
      trackingEnabled: true,
      schedule: 'Ngay',
      status: 'Đã lên lịch',
      createdAt: new Date(),
    };
  }
}
