import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(
    this.getUserFromStorage()
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getUserFromStorage() {
    const user = localStorage.getItem('bp_user');
    return user ? JSON.parse(user) : null;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('bp_token', res.token);
        const user = { ...res.user, id: res.user.id || res.user._id };
        localStorage.setItem('bp_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('bp_token');
    localStorage.removeItem('bp_user');
    this.currentUserSubject.next(null);
  }

  get currentUser()          { return this.currentUserSubject.value; }
  isLoggedIn(): boolean      { return !!localStorage.getItem('bp_token'); }
  isAdmin(): boolean         { return this.currentUser?.role === 'admin'; }
  getToken(): string | null  { return localStorage.getItem('bp_token'); }
}