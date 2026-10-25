import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ServicesComponent implements OnInit {

  services: any[]         = [];
  filteredServices: any[] = [];
  loading                 = true;
  searchText              = '';
  selectedCategory        = '';

  

  get isLoggedIn() { return this.auth.isLoggedIn(); }
get userName() { return this.auth.currentUser?.name || ''; }

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() { this.loadServices(); }

  loadServices() {
    this.loading = true;
    this.api.getServices().subscribe({
      next: (data) => {
        this.services         = data;
        this.filteredServices = data;
        this.loading          = false;
      },
      error: () => { this.loading = false; }
    });
  }

  filterServices() {
    let result = [...this.services];

    if (this.selectedCategory && this.selectedCategory !== 'All') {
      result = result.filter(s =>
        s.category === this.selectedCategory
      );
    }

    if (this.searchText.trim()) {
      const q = this.searchText.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
      );
    }

    this.filteredServices = result;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat === 'All' ? '' : cat;
    this.filterServices();
  }

  clearFilters() {
    this.searchText      = '';
    this.selectedCategory = '';
    this.filteredServices = [...this.services];
  }

  book(service: any) {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/booking', service._id]);
  }

  getCategoryIcon(category: string): string {
    const icons: any = {
      'Hair Care':        '💇',
      'Skin Care':        '✨',
      'Nail Care':        '💅',
      'Makeup':           '💄',
      'Eyebrows & Lashes':'👁️',
      'Facial':           '🧖',
      'Body Treatment':   '🛁',
      'Waxing':           '🌸',
      'Massage':          '💆',
      'Bridal Package':   '👰',
      'Other':            '⭐'
    };
    return icons[category] || '💅';
  }
}