import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket, TicketPriority, TicketStatus } from './support.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent {
  @Input() searchKeyword = '';
  // ✅ Data state signals
  private _tickets = signal<Ticket[]>([
    {
      id: 1,
      requester: 'Linh Nguyen',
      email: 'linh@acme.com',
      subject: 'Cannot access invoice PDF',
      description: 'Customer cannot open invoice file link.',
      owner: 'HCM Team A',
      priority: 'High',
      status: 'Open',
      category: 'Invoices',
      avatar: 'https://i.pravatar.cc/40?img=1',
      createdAt: new Date('2025-03-01T09:00'),
    },
    {
      id: 2,
      requester: 'Quang Tran',
      email: 'q.tran@beta.io',
      subject: 'Update company address',
      description: 'Request to change billing address in account profile.',
      owner: 'Sales VN',
      priority: 'Normal',
      status: 'Pending',
      category: 'Account',
      avatar: 'https://i.pravatar.cc/40?img=12',
      createdAt: new Date('2025-03-02T14:30'),
    },
    {
      id: 3,
      requester: 'Ava Pham',
      email: 'ava@delta.co',
      subject: 'Permission error when sharing',
      description: 'Team cannot share ticket attachments.',
      owner: 'Hanoi Team',
      priority: 'Low',
      status: 'Escalated',
      category: 'Technical',
      avatar: 'https://i.pravatar.cc/40?img=5',
      createdAt: new Date('2025-03-03T10:00'),
    },
  ]);

  search = signal('');
  filterPriority = signal<TicketPriority | 'All'>('All');
  filterStatus = signal<TicketStatus | 'All'>('All');

  // ✅ Derived computed data
  tickets = computed(() => {
    const term = this.search().toLowerCase();
    const prio = this.filterPriority();
    const status = this.filterStatus();
    return this._tickets().filter(
      (t) =>
        (!term ||
          t.subject.toLowerCase().includes(term) ||
          t.requester.toLowerCase().includes(term)) &&
        (prio === 'All' || t.priority === prio) &&
        (status === 'All' || t.status === status)
    );
  });

  // ✅ New ticket form
  newTicket = signal<Partial<Ticket>>({
    requester: '',
    email: '',
    subject: '',
    description: '',
    owner: 'Support Team',
    priority: 'Normal',
    status: 'Open',
    category: 'Invoices',
  });

  addTicket() {
    const ticket = this.newTicket();
    if (!ticket.subject || !ticket.requester)
      return alert('⚠️ Please fill required fields.');

    const newId = this._tickets().length + 1;
    const fullTicket: Ticket = {
      ...(ticket as Ticket),
      id: newId,
      avatar: 'https://i.pravatar.cc/40?u=' + newId,
      createdAt: new Date(),
      email: ticket.email || 'unknown@mail.com',
    };
    this._tickets.update((arr) => [fullTicket, ...arr]);
    this.newTicket.set({
      requester: '',
      email: '',
      subject: '',
      description: '',
      owner: 'Support Team',
      priority: 'Normal',
      status: 'Open',
      category: 'Invoices',
    });
  }

  deleteTicket(id: number) {
    if (confirm('Xóa ticket này?')) {
      this._tickets.update((list) => list.filter((t) => t.id !== id));
    }
  }
}
