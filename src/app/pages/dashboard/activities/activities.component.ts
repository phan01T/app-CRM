import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Activity {
  id: number;
  type: 'Cuộc gọi' | 'Cuộc họp' | 'Nhiệm vụ' | 'Email';
  title: string;
  contact: string;
  company: string;
  time: string;
  note?: string;
}

interface ActivityGroup {
  section: string;
  activities: Activity[];
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent {
  /* ======== TAB STATE ======== */
  activeTab = 'Tất cả';
  tabs = ['Tất cả', 'Cuộc gọi', 'Cuộc họp', 'Nhiệm vụ', 'Email'];
  formTabs = ['Cuộc gọi', 'Cuộc họp', 'Nhiệm vụ', 'Email'];
  selectedType = 'Cuộc gọi';

  /* ======== FORM DỮ LIỆU ======== */
  newActivity: Partial<Activity> = {
    title: '',
    contact: 'Nguyễn Minh Anh (Acme)',
    company: 'Acme',
    note: '',
  };

  /* ======== DỮ LIỆU MẪU ======== */
  groups: ActivityGroup[] = [
    {
      section: 'Hôm nay',
      activities: [
        {
          id: 1,
          type: 'Cuộc gọi',
          title: 'Đã log cuộc gọi: Gọi giới thiệu với Acme',
          contact: 'Nguyễn Minh Anh',
          company: 'Acme',
          time: '10:32',
        },
        {
          id: 2,
          type: 'Nhiệm vụ',
          title: 'Đã hoàn thành nhiệm vụ: Gửi email follow-up',
          contact: '',
          company: 'Acme',
          time: '09:30',
        },
      ],
    },
    {
      section: 'Hôm qua',
      activities: [
        {
          id: 3,
          type: 'Email',
          title: 'Email: Gửi báo giá cho Acme',
          contact: 'Phạm Thu Hà',
          company: 'Acme',
          time: '17:08',
        },
      ],
    },
  ];

  /* ======== BỘ LỌC ======== */
  filter = {
    recordType: 'Liên hệ',
    selectedTypes: new Set(['Cuộc gọi', 'Cuộc họp', 'Nhiệm vụ', 'Email']),
    status: 'Mở',
    period: '30 ngày gần đây',
    assignee: 'Bất kỳ',
  };

  toggleType(type: string) {
    if (this.filter.selectedTypes.has(type)) {
      this.filter.selectedTypes.delete(type);
    } else {
      this.filter.selectedTypes.add(type);
    }
  }

  get filteredGroups(): ActivityGroup[] {
    const types = this.filter.selectedTypes;
    return this.groups.map((g) => ({
      ...g,
      activities: g.activities.filter((a) => types.has(a.type)),
    }));
  }

  /* ======== FORM HÀNH ĐỘNG ======== */
  selectTab(tab: string) {
    this.activeTab = tab;
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  createActivity() {
    if (!this.newActivity.title?.trim()) {
      alert('⚠️ Vui lòng nhập tiêu đề hoạt động!');
      return;
    }

    const now = new Date();
    const newAct: Activity = {
      id: Date.now(),
      type: this.selectedType as Activity['type'],
      title: this.newActivity.title!,
      contact: this.newActivity.contact || 'Không rõ',
      company: this.newActivity.company || 'Không xác định',
      note: this.newActivity.note,
      time: now.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.groups[0].activities.unshift(newAct);
    this.newActivity.title = '';
    this.newActivity.note = '';

    alert(`✅ Đã tạo ${this.selectedType.toLowerCase()} mới!`);
  }

  getIcon(type: string): string {
    switch (type) {
      case 'Cuộc gọi':
        return '📞';
      case 'Cuộc họp':
        return '📅';
      case 'Nhiệm vụ':
        return '✅';
      case 'Email':
        return '✉️';
      default:
        return '🗂️';
    }
  }
}
