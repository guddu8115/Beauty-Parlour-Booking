import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-public',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header-public">
      <div class="logo">💄 Beauty Parlour</div>
      <nav>
        <a routerLink="/"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a routerLink="/gallery"  routerLinkActive="active">Gallery</a>
        <a routerLink="/about"    routerLinkActive="active">About Us</a>
        <a routerLink="/login"    routerLinkActive="active">Login</a>
        <a routerLink="/register" class="register-btn">Register</a>
      </nav>
    </header>
  `,
  styles: [`
    .header-public {
      display:flex; justify-content:space-between; align-items:center;
      padding:16px 40px;
      background:linear-gradient(135deg,#6a0dad,#9b30d9);
      color:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.2);
      flex-wrap:wrap; gap:10px;
    }
    .logo { font-size:1.3rem; font-weight:700; }
    nav { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
    nav a {
      color:#fff; text-decoration:none; font-weight:500;
      padding:7px 14px; border-radius:20px; transition:0.2s; font-size:0.9rem;
    }
    nav a:hover, nav a.active { background:rgba(255,255,255,0.2); }
    .register-btn {
      background:#fff !important; color:#6a0dad !important;
      font-weight:700 !important; padding:7px 18px !important;
      border-radius:20px !important;
    }
    .register-btn:hover { background:#f0e0ff !important; }
  `]
})
export class HeaderPublicComponent {}