import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="header-user">
      <div class="logo">💄 Beauty Parlour</div>
      <nav>
        <a routerLink="/"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/services"       routerLinkActive="active">Services</a>
        <a routerLink="/gallery"        routerLinkActive="active">Gallery</a>
        <a routerLink="/about"          routerLinkActive="active">About Us</a>
        <a routerLink="/my-bookings" routerLinkActive="active">My Bookings</a>
        <a routerLink="/profile"   routerLinkActive="active">Profile</a>
        <span class="user-name">👤 {{ auth.currentUser?.name }}</span>
        <button class="logout-btn" (click)="logout()">Logout</button>
      </nav>
    </header>
  `,
  styles: [`
    .header-user {
      display:flex; justify-content:space-between; align-items:center;
      padding:16px 40px;
      background:linear-gradient(135deg,#6a0dad,#9b30d9);
      color:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.2);
      flex-wrap:wrap; gap:10px;
    }
    .logo { font-size:1.3rem; font-weight:700; }
    nav { display:flex; align-items:center; gap:4px; flex-wrap:wrap; }
    nav a {
      color:#fff; text-decoration:none; font-weight:500;
      padding:7px 12px; border-radius:20px; transition:0.2s; font-size:0.88rem;
    }
    nav a:hover, nav a.active { background:rgba(255,255,255,0.2); }
    .user-name {
      font-style:italic; opacity:0.9; font-size:0.85rem; margin-left:6px;
    }
    .logout-btn {
      background:rgba(255,255,255,0.15); border:1.5px solid #fff;
      color:#fff; padding:7px 16px; border-radius:20px;
      cursor:pointer; transition:0.2s; font-weight:600;
      margin-left:6px; font-size:0.88rem;
    }
    .logout-btn:hover { background:#fff; color:#6a0dad; }
  `]
})
export class HeaderUserComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() { this.auth.logout(); this.router.navigate(['/']); }
}