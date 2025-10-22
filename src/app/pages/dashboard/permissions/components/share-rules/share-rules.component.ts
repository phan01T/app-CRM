import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ShareRule {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-share-rules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './share-rules.component.html',
  styleUrls: ['./share-rules.component.scss'],
})
export class ShareRulesComponent {
  // ==== Danh sách quy tắc mẫu ====
  rules: ShareRule[] = [
    {
      id: 1,
      title: 'Sales có thể xem khách hàng đội khác (Chỉ đọc)',
      description:
        'Đối tượng: Khách hàng • Phạm vi: Đội = cùng khu vực • Quyền: Chỉ đọc',
      status: true,
    },
    {
      id: 2,
      title: 'Quản lý được chỉnh sửa tất cả trong đội',
      description: 'Đối tượng: Cơ hội • Phạm vi: Đội = bất kỳ • Quyền: Đọc/Ghi',
      status: true,
    },
  ];

  // ==== State form ====
  selectedObject = '';
  selectedTeam = ''; // ✅ sửa lại cho khớp với HTML
  selectedPermission = '';
  selectedCondition = '';

  successMsg = '';

  // ==== Đổi trạng thái bật/tắt ====
  toggleStatus(rule: ShareRule) {
    rule.status = !rule.status;
  }

  // ==== Lưu quy tắc mới ====
  saveRule() {
    if (
      !this.selectedObject ||
      !this.selectedTeam ||
      !this.selectedPermission
    ) {
      alert('⚠️ Vui lòng nhập đủ Đối tượng, Ai và Quyền!');
      return;
    }

    const newId = this.rules.length
      ? Math.max(...this.rules.map((r) => r.id)) + 1
      : 1;

    const newRule: ShareRule = {
      id: newId,
      title: `${
        this.selectedTeam
      } có thể ${this.selectedPermission.toLowerCase()} ${this.selectedObject.toLowerCase()}`,
      description: `Đối tượng: ${this.selectedObject} • Quyền: ${
        this.selectedPermission
      } • Điều kiện: ${this.selectedCondition || 'Không có'}`,
      status: true,
    };

    this.rules.unshift(newRule);

    // reset form
    this.selectedObject = '';
    this.selectedTeam = '';
    this.selectedPermission = '';
    this.selectedCondition = '';

    this.successMsg = '✅ Quy tắc mới đã được lưu!';
    setTimeout(() => (this.successMsg = ''), 2500);
  }
}
