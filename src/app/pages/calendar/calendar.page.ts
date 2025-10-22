import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';

/**
 * CalendarPage chỉ là shell dùng cho routing.
 * Hiển thị component lịch chính (CalendarComponent)
 */
@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  template: `<app-calendar></app-calendar>`, // render component con
})
export class CalendarPage {}
