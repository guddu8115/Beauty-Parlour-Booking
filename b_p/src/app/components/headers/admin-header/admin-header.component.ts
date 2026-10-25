import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header-admin">
      <div class="logo">🛠️ Glamour Studio — Admin</div>
      <nav>
        <a routerLink="/admin/dashboard"  routerLinkActive="active">Dashboard</a>
        <a routerLink="/admin/services"   routerLinkActive="active">Services</a>
        <a routerLink="/admin/users"      routerLinkActive="active">Users</a>
        <a routerLink="/admin/bookings"   routerLinkActive="active">Bookings</a>
        <a routerLink="/admin/add-admin"  routerLinkActive="active">Add Admin</a>
        <button class="logout-btn" (click)="logout()">Logout</button>
      </nav>
    </header>
  `,
  styles: [`
    .header-admin {
      display:flex; justify-content:space-between; align-items:center;
      padding:16px 40px;
      background:linear-gradient(135deg,#2c3e50,#e74c3c);
      color:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.2);
      flex-wrap:wrap; gap:10px;
    }
    .logo { font-size:1.2rem; font-weight:700; }
    nav { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
    nav a {
      color:#fff; text-decoration:none; font-weight:500;
      padding:7px 14px; border-radius:6px; transition:0.2s; font-size:0.9rem;
    }
    nav a:hover, nav a.active { background:rgba(255,255,255,0.2); }
    .logout-btn {
      background:#e74c3c; border:none; color:#fff;
      padding:7px 16px; border-radius:6px; cursor:pointer;
      font-weight:600; transition:0.2s; margin-left:8px;
    }
    .logout-btn:hover { background:#c0392b; }
  `]
})
export class HeaderAdminComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigate(['/']); }
}