import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface MenuChild {
  label: string;
  route: string;
  badge?: string | number;
}

export interface MenuItem {
  label: string;
  icon: string;                 // BẮT BUỘC
  route?: string;
  badge?: string | number;
  children?: MenuChild[];
}

@Component({
  selector: 'app-expandable-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './expandable-menu.component.html',
  styleUrls: ['./expandable-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableMenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() isCollapsed = false;

  // nhận map icons (SVG string) và convert sang SafeHtml
  private _iconsSafe: Record<string, SafeHtml> = {};
  @Input() set icons(map: Record<string, string> | null) {
    const out: Record<string, SafeHtml> = {};
    for (const [k, html] of Object.entries(map ?? {})) {
      out[k] = this.sanitizer.bypassSecurityTrustHtml(html);
    }
    this._iconsSafe = out;
  }
  get iconsSafe(): Record<string, SafeHtml> {
    return this._iconsSafe;
  }

  constructor(private sanitizer: DomSanitizer) {}

  openMap: Record<string, boolean> = {};
  trackByLabel = (_: number, x: { label: string }) => x.label;
  isOpen(l: string) { return !!this.openMap[l]; }
  toggleGroup(l: string) { this.openMap[l] = !this.openMap[l]; }
}
