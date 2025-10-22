import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component'; // ✅ Import đúng component chính

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CommonModule, SettingsComponent], // ✅ Import để render
  template: `
    <div class="settings-page-wrapper">
      <app-settings></app-settings>
    </div>
  `,
})
export class SettingsPage {}
