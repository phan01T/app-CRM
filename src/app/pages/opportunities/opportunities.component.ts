import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

/* =======================================================
   📘 INTERFACES
   ======================================================= */
interface Attachment {
  name: string;
  size: string;
}

interface ContactPerson {
  name: string;
  title: string;
  avatar: string;
}

export interface Opportunity {
  id: number;
  name: string;
  account: string;
  closeDate: string;
  probability: number;
  value: number;
  stage: string;
  contact: ContactPerson;
  competitors: string[];
  nextStep: string;
  attachments: Attachment[];
}

/* =======================================================
   🎯 COMPONENT
   ======================================================= */
@Component({
  selector: 'app-opportunities',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'],
})
export class OpportunitiesComponent {
  /* ------------------------------
     🧱 Modal
     ------------------------------ */
  showCreateModal = false;
  opportunityForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.opportunityForm = this.fb.group({
      name: ['', Validators.required],
      account: ['', Validators.required],
      value: [0, Validators.required],
      stage: ['Mới', Validators.required],
      probability: [0],
      closeDate: [''],
      note: [''],
    });
  }

  openCreateModal() {
    this.showCreateModal = true;
    this.opportunityForm.reset({
      name: '',
      account: '',
      value: 0,
      stage: 'Mới',
      probability: 0,
      closeDate: '',
      note: '',
    });
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  /* ------------------------------
     📦 Dữ liệu cơ hội
     ------------------------------ */
  opportunities: Opportunity[] = [
    {
      id: 1,
      name: 'Enterprise Suite cho Globex',
      account: 'Globex Corporation',
      closeDate: '2025-11-28',
      probability: 58,
      value: 84600,
      stage: 'Đàm phán',
      contact: {
        name: 'Dana Scott',
        title: 'VP Thu mua',
        avatar: 'https://i.pravatar.cc/40?img=5',
      },
      competitors: ['Contoso', 'Northwind', 'Umbrella'],
      nextStep:
        'Gửi MSA đã chỉnh sửa và lên lịch đánh giá bảo mật trước Thứ Sáu.',
      attachments: [
        { name: 'Proposal_Q4_v3.pdf', size: '1.2MB' },
        { name: 'MSA_Draft.docx', size: '340KB' },
      ],
    },
  ];

  /* ------------------------------
     🔍 Cơ hội đang hiển thị
     ------------------------------ */
  opportunity: Opportunity = this.opportunities[0];

  /* ------------------------------
     💾 Lưu cơ hội mới
     ------------------------------ */
  saveNewOpportunity() {
    if (this.opportunityForm.invalid) {
      alert('⚠️ Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }

    const data = this.opportunityForm.value;

    const newOpp: Opportunity = {
      id: Date.now(),
      name: data.name,
      account: data.account,
      closeDate: data.closeDate || '—',
      probability: data.probability || 0,
      value: data.value || 0,
      stage: data.stage || 'Mới',
      contact: {
        name: 'Người liên hệ mới',
        title: '—',
        avatar: 'https://i.pravatar.cc/40?u=' + data.name,
      },
      competitors: [],
      nextStep: data.note || '—',
      attachments: [],
    };

    this.opportunities.push(newOpp);
    this.opportunity = newOpp;
    this.closeCreateModal();
  }

  /* ------------------------------
     🔄 Chọn, Xóa
     ------------------------------ */
  selectOpportunity(opp: Opportunity) {
    this.opportunity = opp;
  }

  deleteOpportunity(opp: Opportunity) {
    const confirmDelete = confirm(`🗑 Xóa cơ hội "${opp.name}"?`);
    if (confirmDelete) {
      this.opportunities = this.opportunities.filter((o) => o.id !== opp.id);
      if (this.opportunities.length > 0)
        this.opportunity = this.opportunities[0];
    }
  }
}
