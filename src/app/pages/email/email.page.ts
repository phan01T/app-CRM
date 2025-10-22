import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeEmailComponent } from './components/compose-email/compose-email.component';
import { RecipientsSidebarComponent } from './components/recipients-sidebar/recipients-sidebar.component';
import { RecentEmailsComponent } from './components/recent-emails/recent-emails.component';

@Component({
  selector: 'app-email-page',
  standalone: true,
  imports: [
    CommonModule,
    ComposeEmailComponent,
    RecipientsSidebarComponent,
    RecentEmailsComponent,
  ],
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage {}
