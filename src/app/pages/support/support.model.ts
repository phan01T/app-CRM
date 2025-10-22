/**
 * ===============================
 * 🎯 SUPPORT MODULE MODEL
 * ===============================
 */

/* ========= TYPE DEFINITIONS ========= */
export type TicketPriority = 'High' | 'Normal' | 'Low';
export type TicketStatus = 'Open' | 'Pending' | 'Escalated' | 'Closed';
export type TicketCategory = 'Invoices' | 'Technical' | 'Account' | 'General';

/* ========= CORE ENTITY ========= */
export interface Ticket {
  id: number;
  requester: string;
  email: string;
  subject: string;
  description: string;
  owner: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: TicketCategory;
  avatar?: string;
  createdAt: Date;
  updatedAt?: Date;
}

/* ========= API REQUEST MODELS ========= */
export interface CreateTicketRequest {
  requester: string;
  email: string;
  subject: string;
  description?: string;
  owner: string;
  priority?: TicketPriority;
  status?: TicketStatus;
  category?: TicketCategory;
}

export interface UpdateTicketRequest {
  id: number;
  subject?: string;
  description?: string;
  owner?: string;
  priority?: TicketPriority;
  status?: TicketStatus;
  category?: TicketCategory;
}

/* ========= API RESPONSE MODELS ========= */
export interface TicketResponse {
  success: boolean;
  message?: string;
  data?: Ticket;
}

export interface PaginatedTickets {
  success: boolean;
  total: number;
  page: number;
  pageSize: number;
  data: Ticket[];
}

/* ========= FILTER MODEL ========= */
export interface TicketFilter {
  search?: string;
  priority?: TicketPriority | 'All';
  status?: TicketStatus | 'All';
  category?: TicketCategory | 'All';
  owner?: string;
}
