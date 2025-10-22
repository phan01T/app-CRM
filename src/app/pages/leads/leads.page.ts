import { Component } from '@angular/core';
import { LeadsComponent } from './leads.component';

@Component({
  selector: 'app-leads-page',
  standalone: true,
  imports: [LeadsComponent],
  template: `
    <section>
      <app-leads></app-leads>
    </section>
  `,
})
export class LeadsPage {}
