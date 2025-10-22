import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ============================================================
   🧩 INTERFACES - Mô tả cấu trúc dữ liệu Segment Builder
   ============================================================ */

/** Một bước trong luồng tạo segment (step bar trên cùng) */
interface SegmentStep {
  icon: string;
  label: string;
  active: boolean;
}

/** Trường điều kiện trong form bên trái */
interface SegmentField {
  key: string; // khóa duy nhất, ví dụ: 'city'
  label: string; // nhãn hiển thị
  type: 'text' | 'select' | 'tags'; // kiểu field
  options?: string[]; // danh sách chọn cho select
  values?: string[]; // danh sách tag có sẵn
  value?: string | string[] | null; // giá trị người dùng nhập/chọn
}

/** Một bản ghi xem trước (preview bên phải) */
interface SegmentPreviewItem {
  name: string;
  company: string;
  contact: string;
  tag?: string;
  noTouch?: string;
}

/** Dữ liệu của segment đã lưu */
interface SavedSegment {
  name: string;
  createdAt: string;
  conditions: { label: string; value: string | string[] | null }[];
  preview: SegmentPreviewItem[];
}

@Component({
  selector: 'app-segment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent {
  /* ------------------------------------------------------------
     STEPS: Thanh tiến trình (Điều kiện → Xem trước → Lưu)
     ------------------------------------------------------------ */
  steps: SegmentStep[] = [
    { icon: '👤', label: '1. Điều kiện', active: true },
    { icon: '⚙️', label: '2. Xem trước', active: false },
    { icon: '💾', label: '3. Lưu', active: false },
  ];

  activeStep = 0;

  /* ------------------------------------------------------------
     FIELDS: Các điều kiện lọc dynamic bên trái
     ------------------------------------------------------------ */
  fields: SegmentField[] = [
    { key: 'industry', label: 'Industry', type: 'text', value: 'Software' },
    { key: 'city', label: 'City', type: 'text', value: 'Hà Nội' },
    { key: 'noTouch', label: 'No-touch > x ngày', type: 'text', value: '30' },
    {
      key: 'owner',
      label: 'Owner',
      type: 'select',
      options: ['Any', 'Me', 'Team'],
      value: 'Any',
    },
    {
      key: 'tags',
      label: 'Tags chứa',
      type: 'tags',
      values: ['VIP', 'Prospect'],
      value: ['VIP'],
    },
    {
      key: 'recordType',
      label: 'Loại bản ghi',
      type: 'select',
      options: ['Contacts', 'Leads', 'Companies'],
      value: 'Contacts',
    },
  ];

  /* ------------------------------------------------------------
     DATA: Dữ liệu mẫu cho xem trước
     ------------------------------------------------------------ */
  previewData: SegmentPreviewItem[] = [];
  savedSegments: SavedSegment[] = [];

  sortOptions = ['Hoạt động gần nhất', 'Theo tên', 'Theo ngày tạo'];
  bulkActions = ['Gắn owner', 'Thêm tag', 'Export'];

  /* ------------------------------------------------------------
     FORM STATE
     ------------------------------------------------------------ */
  segmentName = '';

  /* ============================================================
     🔄 HANDLERS
     ============================================================ */

  /** Chuyển bước hiển thị (1 → 2 → 3) */
  setActiveStep(i: number): void {
    this.steps.forEach((s, idx) => (s.active = idx === i));
    this.activeStep = i;
  }

  /** Thêm điều kiện mới */
  addCondition(): void {
    const newField: SegmentField = {
      key: `field_${this.fields.length + 1}`,
      label: `Điều kiện ${this.fields.length + 1}`,
      type: 'text',
      value: '',
    };
    this.fields.push(newField);
  }

  /** Xóa điều kiện */
  removeCondition(index: number): void {
    this.fields.splice(index, 1);
  }

  /** Làm mới form */
  onRefresh(): void {
    this.fields.forEach((f) => (f.value = ''));
  }

  /** Xem trước kết quả */
  onPreview(): void {
    this.setActiveStep(1);
    console.log('Preview conditions:', this.fields);

    // Dữ liệu giả lập
    this.previewData = [
      {
        name: 'Nguyễn Minh Anh',
        company: 'Acme • Software • HN',
        contact: '+84 912 234 567',
        noTouch: '45d',
      },
      {
        name: 'Trần Quốc Huy',
        company: 'Globex • MFG • HCM',
        contact: '+84 977 888 222',
        tag: 'VIP',
      },
      {
        name: 'Phạm Thu Hà',
        company: 'Intech • Software • DN',
        contact: '+84 903 111 999',
        tag: 'Prospect',
      },
    ];
  }

  /** Lưu segment */
  onSaveSegment(): void {
    this.setActiveStep(2);

    const newSegment: SavedSegment = {
      name: this.segmentName || `Segment ${this.savedSegments.length + 1}`,
      createdAt: new Date().toLocaleString('vi-VN'),
      conditions: this.fields.map((f) => ({
        label: f.label,
        value: f.value || '-',
      })),
      preview: this.previewData,
    };

    this.savedSegments.push(newSegment);
    console.log('💾 Saved Segment:', newSegment);
    alert(`✅ Segment "${newSegment.name}" đã được lưu!`);
  }

  /** Tạo segment mới */
  onCreateNew(): void {
    this.segmentName = '';
    this.previewData = [];
    this.fields.forEach((f) => (f.value = ''));
    this.setActiveStep(0);
    alert('✨ Tạo segment mới!');
  }
}
