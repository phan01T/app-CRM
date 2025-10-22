import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersComponent } from './components/owners/owners.component';
import { ShareRulesComponent } from './components/share-rules/share-rules.component';
import { ConsentComponent } from './components/consent/consent.component';

@Component({
  selector: 'app-permissions-page',
  standalone: true,
  imports: [
    CommonModule,
    OwnersComponent,
    ShareRulesComponent,
    ConsentComponent,
  ],
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage {
  activeTab = signal<'owners' | 'rules' | 'consent'>('owners');

  setTab(tab: 'owners' | 'rules' | 'consent') {
    this.activeTab.set(tab);
  }

  isActive(tab: 'owners' | 'rules' | 'consent') {
    return this.activeTab() === tab;
  }
}
