import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FullCalendarModule,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, Calendar } from '@fullcalendar/core';

/* ======================================
   INTERFACES
====================================== */
interface UserManager {
  id: number;
  name: string;
  avatar: string;
  active: boolean;
  role: string;
  color: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string; // YYYY-MM-DD or ISO string
  color: string;
  userId: number;
}

/* ======================================
   COMPONENT
====================================== */
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  /* ===== ViewChild to access calendar API ===== */
  @ViewChild('calendarRef') calendarComponent!: FullCalendarComponent;

  // Lấy API điều khiển lịch (FullCalendar)
  get calendarApi(): Calendar {
    return this.calendarComponent.getApi();
  }

  /* ===== Signals ===== */
  currentDate = signal<string>(''); // hiển thị tháng hiện tại

  users = signal<UserManager[]>([
    {
      id: 1,
      name: 'Phan Thắng',
      avatar: 'assets/image/avatar.png',
      active: true,
      role: 'Admin',
      color: '#3b82f6',
    },
    {
      id: 2,
      name: 'Ngọc Anh',
      avatar: 'assets/image/avatar2.png',
      active: true,
      role: 'CSKH',
      color: '#10b981',
    },
    {
      id: 3,
      name: 'Minh Tâm',
      avatar: 'assets/image/avatar3.png',
      active: true,
      role: 'Sales',
      color: '#f59e0b',
    },
  ]);

  events = signal<CalendarEvent[]>([
    {
      id: '1',
      title: 'Demo sản phẩm',
      start: '2025-10-02',
      color: '#3b82f6',
      userId: 1,
    },
    {
      id: '2',
      title: 'Họp nội bộ',
      start: '2025-10-04',
      color: '#10b981',
      userId: 2,
    },
    {
      id: '3',
      title: 'Ký hợp đồng',
      start: '2025-10-06',
      color: '#f59e0b',
      userId: 3,
    },
  ]);

  /* ===== Tạo sự kiện mới ===== */
  newEvent = {
    title: '',
    date: '',
    time: '',
    type: 'Cuộc gọi',
    customer: '',
    reminder: '15 phút trước',
  };

  /* ===== Cấu hình lịch ===== */
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: false,
    height: 'auto',
    events: [],
    // Khi đổi tháng → cập nhật tiêu đề tháng
    datesSet: (info) => {
      const d = info.start;
      const month = d.toLocaleString('vi-VN', { month: 'long' });
      const year = d.getFullYear();
      this.currentDate.set(
        `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`
      );
    },
  };

  /* ======================================
     LIFECYCLE
  ====================================== */
  ngOnInit() {
    this.updateCalendarEvents();
  }

  /* ======================================
     HÀM XỬ LÝ NGƯỜI DÙNG
  ====================================== */
  toggleUser(user: UserManager) {
    user.active = !user.active;
    this.updateCalendarEvents();
  }

  /* ======================================
     ĐIỀU KHIỂN LỊCH
  ====================================== */
  onMonthChange(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input && input.value) {
      this.calendarApi.gotoDate(input.value + '-01');
    }
  }

  prevMonth() {
    this.calendarApi.prev();
  }

  nextMonth() {
    this.calendarApi.next();
  }

  today() {
    this.calendarApi.today();
  }

  /* ======================================
     CẬP NHẬT DỮ LIỆU HIỂN THỊ LÊN LỊCH
  ====================================== */
  updateCalendarEvents() {
    const activeIds = this.users()
      .filter((u) => u.active)
      .map((u) => u.id);

    this.calendarOptions.events = this.events().filter((e) =>
      activeIds.includes(e.userId)
    );
  }

  /* ======================================
     TẠO SỰ KIỆN MỚI
  ====================================== */
  saveEvent() {
    if (!this.newEvent.title || !this.newEvent.date) {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin sự kiện.');
      return;
    }

    const newEvt: CalendarEvent = {
      id: Date.now().toString(),
      title: this.newEvent.title,
      start: `${this.newEvent.date}T${this.newEvent.time || '09:00'}:00`,
      color: '#2563eb',
      userId: 1,
    };

    this.events.update((events) => [...events, newEvt]);
    this.updateCalendarEvents();

    // Reset form
    this.newEvent = {
      title: '',
      date: '',
      time: '',
      type: 'Cuộc gọi',
      customer: '',
      reminder: '15 phút trước',
    };

    alert('✅ Sự kiện đã được tạo!');
  }

  /* ======================================
     (TÙY CHỌN) API BACKEND MẪU
  ====================================== */
  // async fetchEventsFromApi(start: string, end: string) {
  //   const res = await fetch(`/api/events?start=${start}&end=${end}`);
  //   const data = await res.json();
  //   this.events.set(data);
  //   this.updateCalendarEvents();
  // }
}
