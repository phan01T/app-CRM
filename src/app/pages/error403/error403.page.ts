import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error403-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error403.page.html',
  styleUrls: ['./error403.page.scss'],
})
export class Error403Page {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
