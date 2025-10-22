import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type DealStage = { id: number; code: string; name: string };
type Deal = {
  id: number;
  title: string;
  amount: number;
  description?: string;
  stage: DealStage;
};

const API = 'http://localhost:8080/api';
async function j<T>(method: string, url: string, body?: any): Promise<T> {
  const res = await fetch(`${API}${url}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
const get = <T>(u: string) => j<T>('GET', u);

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dash">
      <h1 class="title">Tổng quan</h1>

      <div *ngIf="error()" class="error">
        Không tải được dữ liệu ({{ error() }}). Kiểm tra API backend chạy ở
        {{ apiUrl }} nhé.
      </div>

      <div class="kpis">
        <div class="kpi">
          <div class="kpi-label">Tổng giao dịch</div>
          <div class="kpi-value">{{ totalDeals() }}</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">Tổng số tiền</div>
          <div class="kpi-value">{{ totalAmount() | number : '1.0-0' }} đ</div>
        </div>
        <div class="kpi">
          <div class="kpi-label">Stage khác nhau</div>
          <div class="kpi-value">{{ stages().length }}</div>
        </div>
      </div>

      <div class="stages" *ngIf="stages().length">
        <div class="stage" *ngFor="let s of stages()">
          <div class="stage-name">{{ s.name }}</div>
          <div class="stage-count">{{ grouped()[s.code]?.length ?? 0 }}</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-h">
          <h2>Giao dịch gần đây</h2>
          <a routerLink="/deals/list" class="link">Xem tất cả</a>
        </div>
        <div class="table-wrap">
          <table class="table" *ngIf="recent().length; else empty">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Stage</th>
                <th style="text-align:right">Số tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of recent()">
                <td>{{ d.id }}</td>
                <td>
                  <a [routerLink]="['/deals', d.id]">{{ d.title }}</a>
                </td>
                <td>{{ d.stage.name }}</td>
                <td style="text-align:right">
                  {{ d.amount | number : '1.0-0' }} đ
                </td>
              </tr>
            </tbody>
          </table>
          <ng-template #empty>
            <div class="empty">
              Chưa có dữ liệu. Hãy tạo vài giao dịch ở
              <a routerLink="/deals/board">Deals Board</a>.
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dash {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .title {
        margin: 0 0 4px;
        font-size: 24px;
        font-weight: 800;
      }
      .error {
        background: #fee2e2;
        color: #991b1b;
        padding: 10px 12px;
        border-radius: 8px;
      }
      .kpis {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }
      .kpi {
        background: #fff;
        border-radius: 12px;
        padding: 14px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
      }
      .kpi-label {
        font-size: 12px;
        color: #64748b;
      }
      .kpi-value {
        font-size: 22px;
        font-weight: 800;
        margin-top: 6px;
      }
      .stages {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 10px;
      }
      .stage {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .stage-name {
        font-weight: 600;
        color: #0f172a;
      }
      .stage-count {
        font-weight: 800;
      }
      .panel {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
      }
      .panel-h {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid #f1f5f9;
      }
      .panel-h h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }
      .link {
        text-decoration: none;
        color: #2563eb;
      }
      .table-wrap {
        overflow: auto;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
      }
      .table th,
      .table td {
        padding: 10px 12px;
        border-bottom: 1px solid #f1f5f9;
      }
      .table th {
        text-align: left;
        font-size: 12px;
        color: #64748b;
        font-weight: 700;
      }
      .table td a {
        color: #0ea5e9;
        text-decoration: none;
      }
      .empty {
        padding: 16px;
        color: #64748b;
      }
      @media (max-width: 900px) {
        .kpis {
          grid-template-columns: 1fr;
        }
        .stages {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class DashboardComponent {
  readonly apiUrl = API;

  stages = signal<DealStage[]>([]);
  deals = signal<Deal[]>([]);
  error = signal<string | null>(null);

  // KPIs
  totalDeals = computed(() => this.deals().length);
  totalAmount = computed(() =>
    this.deals().reduce((s, d) => s + (Number(d.amount) || 0), 0)
  );

  grouped = computed(() => {
    const g: Record<string, Deal[]> = {};
    for (const s of this.stages()) g[s.code] = [];
    for (const d of this.deals()) (g[d.stage.code] ||= []).push(d);
    return g;
  });

  recent = computed(() =>
    [...this.deals()].sort((a, b) => b.id - a.id).slice(0, 8)
  );

  async ngOnInit() {
    try {
      const [st, ds] = await Promise.all([
        get<DealStage[]>('/stages'),
        get<Deal[]>('/deals'),
      ]);
      this.stages.set(st);
      this.deals.set(ds);
      this.error.set(null);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Unknown error');
    }
  }
}
