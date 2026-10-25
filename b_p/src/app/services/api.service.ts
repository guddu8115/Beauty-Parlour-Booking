import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  // Services
  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services`);
  }

  getAllServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/services/all`, { headers: this.getHeaders() });
  }

  addService(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/services`, data, { headers: this.getHeaders() });
  }

  updateService(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/services/${id}`, data, { headers: this.getHeaders() });
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/services/${id}`, { headers: this.getHeaders() });
  }

  // Bookings
  createBooking(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, data, { headers: this.getHeaders() });
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings/my`, { headers: this.getHeaders() });
  }

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings/all`, { headers: this.getHeaders() });
  }

  updateBooking(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/bookings/${id}`, data, { headers: this.getHeaders() });
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${id}`, { headers: this.getHeaders() });
  }

  // Users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`, { headers: this.getHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/profile`, data, { headers: this.getHeaders() });
  }
}