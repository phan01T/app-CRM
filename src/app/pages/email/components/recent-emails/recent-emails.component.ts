import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../email.service';
import { EmailMessage, EmailRecipient } from '../../email.model';

@Component({
  selector: 'app-recent-emails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recent-emails.component.html',
  styleUrls: ['./recent-emails.component.scss'],
})
export class RecentEmailsComponent {
  private emailService = inject(EmailService);

  /** ✅ Danh sách email dynamic (realtime) */
  emails = computed(() => this.emailService.emails());

  /** ✅ Form thêm email */
  showForm = signal(false);

  newEmail = signal<EmailMessage>({
    id: Date.now(),
    from: 'sales@company.com',
    sendAs: 'Nhóm Kinh doanh',
    owner: '',
    to: [],
    subject: '',
    body: '',
    trackingEnabled: true,
    schedule: 'Ngay',
    status: 'Đã gửi',
    createdAt: new Date(),
  });

  /** ✅ Toggle hiển thị form */
  toggleForm() {
    this.showForm.update((v) => !v);
  }

  /** ✅ Xử lý thêm email */
  addNewEmail() {
    const e = this.newEmail();
    if (!e.subject.trim() || !e.owner.trim()) {
      alert('⚠️ Vui lòng nhập tiêu đề và chủ sở hữu!');
      return;
    }

    this.emailService.addEmail({
      ...e,
      id: Date.now(),
      createdAt: new Date(),
    });

    alert('✅ Đã thêm email mới vào danh sách!');
    this.showForm.set(false);

    // reset form
    this.newEmail.update((n) => ({
      ...n,
      subject: '',
      owner: '',
      status: 'Đã gửi',
    }));
  }

  /** ✅ Helper format người nhận */
  getRecipientsText(toList: EmailRecipient[] | undefined): string {
    if (!toList || toList.length === 0) return '(Trống)';
    return toList.map((r) => r.email).join(', ');
  }
}
