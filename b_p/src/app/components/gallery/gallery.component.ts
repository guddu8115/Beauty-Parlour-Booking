import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  filteredItems: any[] = [];
  selectedItem: any = null;
  loading = true;

  gallery = [
    { name: 'Gallery 1', imageUrl: 'assets/images/g1.jpg', description: 'Beautiful bridal look' },
    { name: 'Gallery 2', imageUrl: 'assets/images/g2.jpg', description: 'Professional hair styling' },
    { name: 'Gallery 3', imageUrl: 'assets/images/g3.jpg', description: 'Hair treatment service' },
    { name: 'Gallery 4', imageUrl: 'assets/images/g4.jpg', description: 'Hair care service' },
    { name: 'Gallery 5', imageUrl: 'assets/images/g5.jpg', description: 'Elegant bridal styling' },
    { name: 'Gallery 6', imageUrl: 'assets/images/g6.jpg', description: 'Relaxing body treatment' },
    { name: 'Keratin Treatment', imageUrl: 'assets/images/keratin.jpg', description: 'Smooth keratin treatment' },
    { name: 'Nail Art', imageUrl: 'assets/images/nailart.jpg', description: 'Creative nail art designs' },
  ];

  ngOnInit() {
    this.filteredItems = this.gallery;
    this.loading = false;
  }

  openModal(item: any) {
    this.selectedItem = item;
  }

  closeModal() {
    this.selectedItem = null;
  }
}