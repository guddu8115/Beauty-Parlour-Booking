import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <div class="booking-card">
        <h2>📅 Book Appointment</h2>
        <div class="service-info" *ngIf="service">
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>
          <div class="meta"><span>₹{{ service.price }}</span><span>⏱ {{ service.duration }}</span></div>
        </div>
        <div class="alert error" *ngIf="error">{{ error }}</div>
        <div class="alert success" *ngIf="success">{{ success }}</div>
        <div class="form-group">
          <label>Date</label>
          <input type="date" [(ngModel)]="form.date" [min]="today" />
        </div>
        <div class="form-group">
          <label>Preferred Time</label>
          <select [(ngModel)]="form.time">
            <option value="">Select time</option>
            <option *ngFor="let t of timeSlots" [value]="t">{{ t }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notes (optional)</label>
          <textarea [(ngModel)]="form.notes" rows="3" placeholder="Any special requests?"></textarea>
        </div>
        <div class="actions">
          <button (click)="goBack()" class="btn-back">← Back</button>
          <button (click)="confirmBooking()" [disabled]="loading" class="btn-confirm">
            {{ loading ? 'Booking...' : 'Confirm Booking' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { min-height:calc(100vh - 70px); background:#fdf6f0; display:flex; align-items:center; justify-content:center; padding:30px; }
    .booking-card { background:#fff; border-radius:20px; padding:40px; width:100%; max-width:500px; box-shadow:0 10px 40px rgba(0,0,0,0.1); }
    h2 { color:#333; font-size:1.8rem; margin-bottom:25px; text-align:center; }
    .service-info { background:#fdf6f0; border-radius:12px; padding:20px; margin-bottom:25px; }
    .service-info h3 { color:#d63384; font-size:1.2rem; margin-bottom:8px; }
    .service-info p { color:#666; font-size:0.9rem; margin-bottom:12px; }
    .meta { display:flex; gap:20px; }
    .meta span { font-weight:600; color:#333; }
    .alert { padding:12px; border-radius:8px; margin-bottom:20px; font-size:0.9rem; }
    .alert.error { background:#ffe0e0; color:#cc0000; }
    .alert.success { background:#e0ffe0; color:#007700; }
    .form-group { margin-bottom:20px; }
    label { display:block; margin-bottom:6px; color:#555; font-weight:600; font-size:0.9rem; }
    input, select, textarea { width:100%; padding:12px 16px; border:2px solid #eee; border-radius:10px; font-size:1rem; box-sizing:border-box; transition:border 0.3s; }
    input:focus, select:focus, textarea:focus { outline:none; border-color:#d63384; }
    .actions { display:flex; gap:15px; margin-top:25px; }
    .btn-back { flex:1; padding:14px; background:#f5f5f5; color:#333; border:none; border-radius:10px; cursor:pointer; font-weight:700; }
    .btn-confirm { flex:2; padding:14px; background:linear-gradient(135deg,#d63384,#7b2d8b); color:#fff; border:none; border-radius:10px; cursor:pointer; font-weight:700; font-size:1rem; }
    .btn-confirm:disabled { opacity:0.7; cursor:not-allowed; }
  `]
})
export class BookingComponent implements OnInit {
  service: any = null;
  form = { date: '', time: '', notes: '' };
  loading = false; error = ''; success = '';
  today = new Date().toISOString().split('T')[0];
  timeSlots = ['10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM'];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.getServices().subscribe(services => {
      this.service = services.find(s => s._id === id);
    });
  }

  goBack() { this.router.navigate(['/services']); }

  confirmBooking() {
    if (!this.form.date || !this.form.time) { this.error = 'Please select date and time'; return; }
    this.loading = true; this.error = '';
    this.api.createBooking({ service: this.service._id, date: this.form.date, time: this.form.time, notes: this.form.notes }).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Booking confirmed! Redirecting...';
        setTimeout(() => this.router.navigate(['/my-bookings']), 1500);
      },
      error: (err) => { this.loading = false; this.error = err.error?.message || 'Booking failed'; }
    });
  }
}