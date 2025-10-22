import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerProfile {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  tax: string;
  industry: string;
  size: string;
  type: string;
  locked: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(this.baseUrl);
  }

  create(customer: CustomerProfile): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(this.baseUrl, customer);
  }

  update(id: number, customer: CustomerProfile): Observable<CustomerProfile> {
    return this.http.put<CustomerProfile>(`${this.baseUrl}/${id}`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
