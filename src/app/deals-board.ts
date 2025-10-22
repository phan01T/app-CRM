import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-deals-board',
  imports: [CommonModule],
  template: `
    <h2>Deals Board (demo)</h2>
    <p>Đây là nội dung demo. Bạn có thể thay bằng board thật sau.</p>
  `
})
export class DealsBoardDemoComponent {}
