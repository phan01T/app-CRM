import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomerProfile {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  city: string;
  tags: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerProfileService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(this.apiUrl);
  }

  create(customer: CustomerProfile): Observable<CustomerProfile> {
    return this.http.post<CustomerProfile>(this.apiUrl, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(keyword: string): Observable<CustomerProfile[]> {
    return this.http.get<CustomerProfile[]>(
      `${this.apiUrl}/search?keyword=${keyword}`
    );
  }
}
