import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../email.service';

/* ----------------------------
   INTERFACES
----------------------------- */
interface RecipientGroup {
  id: number;
  name: string;
  count: number; // tổng số người trong nhóm
  color: string; // màu tag nhóm
}

interface CsvRecipient {
  name: string;
  email: string;
}

@Component({
  selector: 'app-recipients-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipients-sidebar.component.html',
  styleUrls: ['./recipients-sidebar.component.scss'],
})
export class RecipientsSidebarComponent {
  /* ----------------------------
     SERVICE
  ----------------------------- */
  private emailService = inject(EmailService);

  /* ----------------------------
     SIGNALS CHÍNH
  ----------------------------- */
  groups = signal<RecipientGroup[]>([
    { id: 1, name: 'Khách hàng tiềm năng', count: 2, color: '#22c55e' },
    { id: 2, name: 'Đã mua hàng', count: 1, color: '#3b82f6' },
  ]);

  showAddForm = signal(false);
  newGroupName = signal('');
  newGroupColor = signal('#6366f1');

  // Import CSV
  csvPreview = signal<CsvRecipient[]>([]);
  importCount = signal<number | null>(null);
  showPreview = signal(false);
  fileName = signal('');

  // Quyền & đồng ý marketing
  marketingConsent = signal('Cho phép Marketing');
  linkOption = signal('Tự động thêm');

  /* ----------------------------
     TỔNG NGƯỜI NHẬN
  ----------------------------- */
  totalRecipients = computed(() =>
    this.groups()
      .map((g) => g.count)
      .reduce((a, b) => a + b, 0)
  );

  /* ----------------------------
     NHÓM NGƯỜI NHẬN
  ----------------------------- */

  // Toggle form thêm nhóm
  toggleAddForm() {
    this.showAddForm.update((v) => !v);
  }

  // ➕ Thêm nhóm mới
  addGroup() {
    const name = this.newGroupName().trim();
    if (!name) {
      alert('⚠️ Nhập tên nhóm!');
      return;
    }

    const id = Date.now();
    const color = this.newGroupColor();

    const newGroup: RecipientGroup = {
      id,
      name,
      count: 0,
      color,
    };

    this.groups.update((list) => [...list, newGroup]);

    // reset form
    this.newGroupName.set('');
    this.newGroupColor.set('#6366f1');
    this.showAddForm.set(false);
  }

  // ❌ Xóa nhóm
  deleteGroup(id: number) {
    this.groups.update((list) => list.filter((g) => g.id !== id));
  }

  /* ----------------------------
     IMPORT CSV NGƯỜI NHẬN
  ----------------------------- */

  handleCsvUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileName.set(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const recipients = this.parseCsv(text);

      this.csvPreview.set(recipients.slice(0, 10));
      this.importCount.set(recipients.length);
      this.showPreview.set(true);
    };
    reader.readAsText(file);
  }

  parseCsv(csv: string): CsvRecipient[] {
    const lines = csv
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const recipients: CsvRecipient[] = [];

    for (let line of lines) {
      const [name, email] = line.split(',').map((v) => v.trim());
      if (email && email.includes('@')) {
        recipients.push({ name: name || email.split('@')[0], email });
      }
    }
    return recipients;
  }

  confirmImport() {
    const count = this.importCount() ?? 0;
    if (count === 0) {
      alert('⚠️ Không có dữ liệu để import!');
      return;
    }

    this.groups.update((groups) => {
      if (groups.length === 0) return groups;
      // ví dụ: cộng vào nhóm đầu tiên
      const first = { ...groups[0], count: groups[0].count + count };
      return [first, ...groups.slice(1)];
    });

    alert(`✅ Đã thêm ${count} người từ "${this.fileName()}"!`);
    this.resetPreview();
  }

  cancelImport() {
    this.resetPreview();
  }

  resetPreview() {
    this.csvPreview.set([]);
    this.importCount.set(null);
    this.fileName.set('');
    this.showPreview.set(false);
  }

  /* ----------------------------
     MARKETING CONSENT & LINK
  ----------------------------- */
  updateMarketingConsent(v: string) {
    this.marketingConsent.set(v);
  }

  updateLinkOption(v: string) {
    this.linkOption.set(v);
  }
}
