import { Component, HostListener } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { StageCardComponent } from '../../stage-card/stage-card.component';
import { icons } from '../../shared/icons';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

type Stage = {
  title: string;
  icon: string; // key trong icons.ts (vd: 'users', 'db', 'chart'…)
  color: string; // màu chủ đạo
  quick: boolean; // có nút tạo nhanh?
  count?: number;
  amount?: number;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, NgFor, StageCardComponent, NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router) {}
  // UI state
  title = 'Các giao dịch';
  segment = 'Chung';
  searchText = '';
  chips: string[] = ['Các giao dịch đang thực hiện'];

  tabs = ['Danh sách', 'Các hoạt động', 'Lịch'];
  activeTab = this.tabs[0];

  counts = [
    { label: 'Đến', value: 0 },
    { label: 'Đã lập kế hoạch', value: 0 },
  ];

  // Menu tạo
  createOpen = false;
  createItems = [
    {
      label: 'Tạo giao dịch',
      icon: icons['deal'],
      action: () => console.log('Tạo giao dịch'),
    },
  ];

  // Danh sách thẻ stage
  stages: Stage[] = [
    {
      title: 'Hồ sơ khách hàng',
      icon: 'users',
      color: '#06b6d4',
      quick: true,
      count: 0,
    },
    {
      title: 'Phân đoạn & danh sách',
      icon: 'db',
      color: '#2563eb',
      quick: true,
      count: 0,
    },
    {
      title: 'Hoạt động và lịch sử',
      icon: 'chart',
      color: '#10b981',
      quick: true,
      count: 0,
    },
    {
      title: 'Nhập/xuất & đồng bộ',
      icon: 'cube',
      color: '#8b5cf6',
      quick: true,
      count: 0,
    },
    {
      title: 'Quyền & tuân thủ',
      icon: 'shield',
      color: '#ec4899',
      quick: true,
      count: 3,
    },
  ];

  loading = false;
  errorMsg: string | null = null;

  // Actions
  removeChip(i: number) {
    this.chips.splice(i, 1);
  }
  clearSearch() {
    this.searchText = '';
  }
  onCreate() {
    console.log('Click Tạo');
  }

  toggleCreate(e?: Event) {
    e?.stopPropagation();
    this.createOpen = !this.createOpen;
  }
  clickCreateItem(it: any) {
    if (it?.disabled) return;
    this.createOpen = false;
    it?.action?.();
  }
  create(kind: string) {
    console.log('Create', kind);
  }

  onOpenStage(s: Stage) {
    console.log('Open stage:', s.title);
  }
  onQuickCreateStage(s: Stage) {
    if (s.title === 'Hồ sơ khách hàng') {
      this.router.navigate(['/customer']);
    }
    if (s.title === 'Phân đoạn & danh sách') {
      this.router.navigate(['/segment']);
    }
    if (s.title === 'Hoạt động và lịch sử') {
      this.router.navigate(['/activities']);
    }
    if (s.title === 'Nhập/xuất & đồng bộ') {
      this.router.navigate(['/sync']);
    }
    if (s.title === 'Quyền & tuân thủ') {
      this.router.navigate(['/permissions']);
    }
  }

  balanceData = [
    {
      name: 'Gross',
      series: [
        { name: 'Jan', value: 5 },
        { name: 'Feb', value: 16 },
        { name: 'Mar', value: 14 },
        { name: 'Apr', value: 10 },
        { name: 'May', value: 18 },
        { name: 'Jun', value: 23 },
        { name: 'Jul', value: 30 },
      ],
    },
    {
      name: 'Net total',
      series: [
        { name: 'Jan', value: 12 },
        { name: 'Feb', value: 6 },
        { name: 'Mar', value: 8 },
        { name: 'Apr', value: 15 },
        { name: 'May', value: 20 },
        { name: 'Jun', value: 22 },
        { name: 'Jul', value: 24 },
      ],
    },
  ];

  // ----- BAR: Total sales -----
  salesData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 14 },
    { name: 'Apr', value: 18 },
    { name: 'May', value: 29 },
    { name: 'Jun', value: 18 },
    { name: 'Jul', value: 22 },
    { name: 'Aug', value: 16 },
    { name: 'Sep', value: 12 },
    { name: 'Oct', value: 9 },
    { name: 'Nov', value: 11 },
    { name: 'Dec', value: 16 },
  ];

  // ----- DONUT: Market share -----
  marketShare = [
    { name: 'US', value: 38.6 },
    { name: 'Canada', value: 22.5 },
    { name: 'Mexico', value: 30.8 },
    { name: 'Other', value: 8.1 },
  ];

  // Top products
  topProducts = [
    { name: 'Visa analysis', delta: 244 },
    { name: 'Enterprise Suite', delta: 326 },
    { name: 'CRM Platform', delta: 408 },
    { name: 'B2B Market enterprise', delta: 408 },
  ];

  // Options chung cho charts
  view: [number, number] = [600, 260];
  showLegend = false;
  showXAxis = true;
  showYAxis = true;
  showGridLines = true;
  roundDomains = true;

  singleColor: Color = {
    name: 'single',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2F5597'],
  };

  colorScheme: Color = {
    name: 'brand',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#2F5597', '#16a34a', '#9333ea', '#ef4444'],
  };

  grouped() {
    const groups: { [key: string]: any[] } = {};
    // code group logic ...
    return groups;
  }

  @HostListener('document:click') closeOutside() {
    this.createOpen = false;
  }
}
