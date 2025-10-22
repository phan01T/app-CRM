import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from './invoices.component';

@Component({
  selector: 'app-invoices-page',
  standalone: true,
  imports: [CommonModule, InvoicesComponent],
  template: `
    <div class="invoice-wrapper">
      <app-invoices></app-invoices>
    </div>
  `,
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesPage {}
