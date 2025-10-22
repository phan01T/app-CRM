export type EmailStatus = 'Đã gửi' | 'Đã lên lịch' | 'Lỗi';
export type EmailCategory = 'Khách hàng' | 'Lead' | 'Cơ hội';

export interface EmailRecipient {
  name: string;
  email: string;
  avatar?: string;
  group?: string;
}

export interface EmailMessage {
  id: number;
  from: string;
  sendAs: string;
  to: EmailRecipient[];
  cc?: EmailRecipient[];
  subject: string;
  body: string;
  owner: string;
  attachments?: string[];
  trackingEnabled: boolean;
  schedule?: string;
  status: EmailStatus;
  createdAt: Date;
}

export interface RecipientGroup {
  name: string;
  count: number;
  type: EmailCategory;
}
