import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
})
export class InvitationComponent {
  activeTab = 'link'; // link | email | sms | newuser

  @Output() closed = new EventEmitter<void>();

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // gọi khi bấm nút "Đóng"
  close() {
    this.closed.emit();
  }
}
