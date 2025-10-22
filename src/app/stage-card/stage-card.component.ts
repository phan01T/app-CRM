import { Component, Input, Output, EventEmitter } from '@angular/core';
import { icons } from './../../sidebar/icons';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-stage-card',
  standalone: true,
  imports: [NgIf,CommonModule],
  templateUrl: './stage-card.component.html',
  styleUrls: ['./stage-card.component.scss'],
})
export class StageCardComponent {
  /** Tiêu đề stage (VD: "Hồ sơ khách hàng") */
  @Input() title = '';

  /** Icon key để lấy trong icons.ts */
  @Input() icon: string = '';

  /** Màu chủ đạo (vd: #06b6d4) */
  @Input() color: string = '#0ea5e9';

  /** Số lượng item trong stage */
  @Input() count: number | null | undefined;

  /** Tổng số tiền của stage */
  @Input() amount: number | null | undefined;

  /** Có hiển thị nút “Giao dịch nhanh” không */
  @Input() showQuickButton = true;

  /** Khi bấm “tạo nhanh” */
  @Output() quickCreate = new EventEmitter<void>();

  /** Khi click toàn card */
  @Output() open = new EventEmitter<void>();

  onQuickCreate(e: MouseEvent) {
    e.stopPropagation(); // tránh bubble lên card
    this.quickCreate.emit();
  }

  onOpen() {
    this.open.emit();
  }

  
  get iconPath(): string | null {
    return icons[this.icon] ?? null;
  }
}
