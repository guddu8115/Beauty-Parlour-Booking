import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  team = [
    { name: 'Khushi Sharma', role: 'Founder & Hair Stylist', image: 'assets/images/khushi.jpg', exp: '10+ years' },
    { name: 'Neha Patel', role: 'Skincare Specialist', image: 'assets/images/neha.jpg', exp: '7+ years' },
    { name: 'Nidhi Patel', role: 'Nail Art Expert', image: 'assets/images/nidhi.jpg.jpeg', exp: '5+ years' },
    { name: 'Avni Thummar', role: 'Bridal Makeup Artist', image: 'assets/images/avni.jpg', exp: '8+ years' }
  ];

  features = [
    { icon: '✨', title: 'Premium Products', desc: 'We use only top-quality products.' },
    { icon: '🏠', title: 'Relaxing Environment', desc: 'Calm and luxury experience.' },
    { icon: '👩‍⚕️', title: 'Expert Professionals', desc: 'Certified and trained staff.' },
    { icon: '💰', title: 'Affordable Prices', desc: 'Budget friendly services.' },
    { icon: '📅', title: 'Easy Booking', desc: 'Book anytime online.' },
    { icon: '💯', title: '100% Satisfaction', desc: 'We guarantee satisfaction.' }
  ];
}