import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Ticket,
  TicketResponse,
  PaginatedTickets,
  CreateTicketRequest,
  UpdateTicketRequest,
} from './support.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private readonly API_URL = '/api/tickets';
  tickets = signal<Ticket[]>([]);

  constructor(private http: HttpClient) {}

  async fetchAll() {
    const res = await firstValueFrom(
      this.http.get<PaginatedTickets>(this.API_URL)
    );
    if (res.success) this.tickets.set(res.data);
  }

  async create(payload: CreateTicketRequest) {
    return await firstValueFrom(
      this.http.post<TicketResponse>(this.API_URL, payload)
    );
  }

  async update(id: number, payload: UpdateTicketRequest) {
    return await firstValueFrom(
      this.http.put<TicketResponse>(`${this.API_URL}/${id}`, payload)
    );
  }

  async delete(id: number) {
    return await firstValueFrom(
      this.http.delete<TicketResponse>(`${this.API_URL}/${id}`)
    );
  }
}
