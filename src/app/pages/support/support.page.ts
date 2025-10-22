import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportComponent } from './support.component';

@Component({
  selector: 'app-support-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SupportComponent],
  template: `
    <div class="support-page">
      <!-- Header -->
      <header class="support-header">
        <div class="logo">
          <h2>CRM Support</h2>
        </div>

        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="globalSearch"
            placeholder="Tìm kiếm ticket, khách hàng..."
          />
        </div>

        <div class="header-actions">
          <button class="btn-outline">❔ Help</button>
          <button class="btn-primary" (click)="createNewTicket()">
            + New Ticket
          </button>
        </div>
      </header>

      <!-- Content -->
      <section class="support-body">
        <app-support [searchKeyword]="globalSearch"></app-support>
      </section>
    </div>
  `,
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {
  globalSearch = '';

  createNewTicket() {
    alert('🆕 Mở form tạo ticket mới (demo)');
  }
}
