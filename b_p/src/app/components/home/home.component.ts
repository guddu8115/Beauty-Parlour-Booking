import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>✨ Welcome to <span>Beauty Parlour</span></h1>
        <p>Experience the finest beauty treatments tailored just for you.</p>
        <div class="hero-btns" *ngIf="!isLoggedIn">
          <a routerLink="/register" class="btn-primary">Get Started</a>
          <a routerLink="/login" class="btn-secondary">Login</a>
        </div>
        <div class="hero-btns" *ngIf="isLoggedIn">
          <a routerLink="/services" class="btn-primary">Book a Service</a>
          <a routerLink="/my-bookings" class="btn-secondary">My Bookings</a>
        </div>
      </div>
    </div>

    <section class="features">
      <h2>Why Choose Us?</h2>
      <div class="cards">
        <div class="card"><div class="icon">💆</div><h3>Expert Care</h3><p>Professional stylists with years of experience.</p></div>
        <div class="card"><div class="icon">🌸</div><h3>Premium Products</h3><p>Only the finest beauty products used.</p></div>
        <div class="card"><div class="icon">📅</div><h3>Easy Booking</h3><p>Book your appointment anytime, anywhere.</p></div>
      </div>
    </section>

    <section class="cta" *ngIf="!isLoggedIn">
      <h2>Ready to look your best?</h2>
      <p>Sign up today and get access to all our services.</p>
      <a routerLink="/register" class="btn-primary">Register Now</a>
    </section>
  `,
  styles: [`
    .hero { background:linear-gradient(135deg,#ff6b9d,#d63384,#7b2d8b);
      min-height:30vh; display:flex; align-items:center; justify-content:center; text-align:center; }
    .hero-content h1 { color:#fff; font-size:3rem; margin-bottom:15px; }
    .hero-content h1 span { color:#ffe0f7; }
    .hero-content p { color:rgba(255,255,255,0.85); font-size:1.2rem; margin-bottom:30px; }
    .hero-btns { display:flex; gap:15px; justify-content:center; flex-wrap:wrap; }
    .btn-primary { background:#fff; color:#d63384; padding:14px 32px; border-radius:30px;
      text-decoration:none; font-weight:700; font-size:1rem; transition:all 0.3s; }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,0.2); }
    .btn-secondary { background:transparent; color:#fff; border:2px solid #fff;
      padding:14px 32px; border-radius:30px; text-decoration:none; font-weight:700; transition:all 0.3s; }
    .btn-secondary:hover { background:rgba(255,255,255,0.15); }
    .features { padding:80px 40px; text-align:center; background:#fff; }
    .features h2 { font-size:2.2rem; color:#333; margin-bottom:50px; }
    .cards { display:flex; gap:20px; justify-content:center; flex-wrap:wrap; }
    .card { background:#fdf6f0; padding:40px 30px; border-radius:15px;
      max-width:260px; box-shadow:0 4px 15px rgba(0,0,0,0.08); transition:transform 0.3s; }
    .card:hover { transform:translateY(-5px); }
    .icon { font-size:3rem; margin-bottom:15px; }
    .card h3 { color:#d63384; font-size:1.3rem; margin-bottom:10px; }
    .cta { background:linear-gradient(135deg,#ffe0f7,#fdf6f0); padding:80px 40px; text-align:center; }
    .cta h2 { font-size:2rem; color:#333; margin-bottom:10px; }
    .cta p { color:#666; margin-bottom:30px; font-size:1.1rem; }
  `]
})
export class HomeComponent {
  get isLoggedIn() { return this.auth.isLoggedIn(); }
  constructor(private auth: AuthService) {}
}