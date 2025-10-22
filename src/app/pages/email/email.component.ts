import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { RecentEmailsComponent } from './components/recent-emails/recent-emails.component';
import { EmailService } from './email.service';
import { EmailMessage } from './email.model';
import { RecipientsSidebarComponent } from './components/recipients-sidebar/recipients-sidebar.component';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ComposeEmailComponent,
    RecentEmailsComponent,
    RecipientsSidebarComponent,
  ],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  search: string = '';
  contacts = signal([
    { name: 'Lan Phạm', email: 'lan.pham@company.com' },
    { name: 'Minh Lê', email: 'minh.le@company.com' },
    { name: 'An Nguyễn', email: 'an.nguyen@company.com' },
  ]);

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.loadEmails();
  }

  handleSend(email: EmailMessage) {
    this.emailService.addEmail(email);
  }
}
