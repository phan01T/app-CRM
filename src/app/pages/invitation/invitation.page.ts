import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InvitationComponent } from './invitation.component';
import { Route, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-invitation-page',
  standalone: true,
  imports: [CommonModule, InvitationComponent, RouterModule],
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage {
  constructor(private router: Router) {}

  close(): void {
    console.log('Đã Bấm Đóng');
    // Quay về danh sách nhân viên
    this.router.navigate(['/employee']);
  }
}
