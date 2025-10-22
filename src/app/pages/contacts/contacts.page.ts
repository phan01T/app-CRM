import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';

@Component({
  selector: 'app-contacts-page',
  standalone: true,
  imports: [CommonModule, ContactsComponent],
  template: `
    <div class="contacts-container">
      <app-contacts></app-contacts>
    </div>
  `,
})
export class ContactsPage {}
