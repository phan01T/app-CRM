import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../email.service';
import { EmailMessage, EmailRecipient } from '../../email.model';

@Component({
  selector: 'app-compose-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss'],
})
export class ComposeEmailComponent {
  private emailService = inject(EmailService);

  /** ✅ Reference đến danh sách người từng nhận email trước đây */
  knownRecipients = computed<EmailRecipient[]>(() => {
    const allEmails = this.emailService.emails();
    const flattened = allEmails.flatMap((e) => e.to);
    // loại trùng theo email
    return flattened.filter(
      (r, i, arr) => arr.findIndex((x) => x.email === r.email) === i
    );
  });

  /** ✅ Người nhận hiện tại */
  recipients = signal<EmailRecipient[]>([]);

  /** ✅ Biến tạm cho input */
  newRecipient = signal('');

  /** ✅ Mẫu email đang soạn */
  email = signal<EmailMessage>({
    id: Date.now(),
    from: 'sales@company.com',
    sendAs: 'Nhóm Kinh doanh',
    owner: 'Sales VN',
    to: [],
    subject: '',
    body: '',
    trackingEnabled: true,
    schedule: 'Ngay',
    status: 'Đã gửi',
    createdAt: new Date(),
  });

  /** ✅ Thêm người nhận */
  addRecipient(address: string) {
    const existing = this.knownRecipients().find((r) => r.email === address);
    if (existing && !this.recipients().some((r) => r.email === address)) {
      this.recipients.update((list) => [...list, existing]);
    } else if (!existing && address.includes('@')) {
      // người nhận mới chưa có trong danh sách
      this.recipients.update((list) => [
        ...list,
        { name: address.split('@')[0], email: address },
      ]);
    }
    this.newRecipient.set('');
  }

  /** ✅ Xóa người nhận */
  removeRecipient(i: number) {
    this.recipients.update((list) => list.filter((_, idx) => idx !== i));
  }

  /** ✅ Gửi email */
  sendEmail() {
    if (
      !this.recipients().length ||
      !this.email().subject ||
      !this.email().body
    ) {
      alert('⚠️ Nhập người nhận, tiêu đề và nội dung trước khi gửi!');
      return;
    }

    const newEmail: EmailMessage = {
      ...this.email(),
      id: Date.now(),
      to: this.recipients(),
      createdAt: new Date(),
    };

    this.emailService.addEmail(newEmail);
    alert(
      `📨 Đã gửi email đến ${this.recipients()
        .map((r) => r.email)
        .join(', ')}`
    );

    this.recipients.set([]);
    this.email.update((e) => ({ ...e, subject: '', body: '' }));
  }
}
