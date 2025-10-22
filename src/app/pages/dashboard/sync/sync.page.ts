import { Component } from '@angular/core';
import { SyncComponent } from './sync.component';

@Component({
  selector: 'app-sync-page',
  standalone: true,
  imports: [SyncComponent],
  template: `<app-sync></app-sync>`, // ✅ dùng đúng selector
})
export class SyncPage {}
