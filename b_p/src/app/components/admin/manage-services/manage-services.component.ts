import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ManageServicesComponent implements OnInit {

  services: any[] = [];
  loading = true;
  showForm = false;
  editing = false;
  editId = '';
  saving = false;
  submitted = false;
  formError = '';
  formSuccess = '';
  imagePreview: string | null = null;

  categories = [
    'Hair Care',
    'Skin Care',
    'Nail Care',
    'Makeup',
    'Eyebrows & Lashes',
    'Facial',
    'Body Treatment',
    'Waxing',
    'Massage',
    'Bridal Package',
    'Other'
  ];

  form: any = {
    name: '',
    description: '',
    price: 0,
    duration: '',
    category: '',
    image: '',
    imageName: '',
    isActive: true
  };

  get activeCount() {
    return this.services.filter(s => s.isActive).length;
  }

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getAllServices().subscribe({
      next: (data) => { this.services = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  toggleForm() {
    if (this.showForm && !this.editing) {
      this.cancel();
    } else {
      this.showForm = !this.showForm;
    }
  }

  onImageSelect(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    this.processFile(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) this.processFile(file);
  }

  processFile(file: File) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      this.formError = 'Only JPG, PNG, WEBP or GIF images are allowed';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.formError = 'Image must be smaller than 5MB';
      return;
    }
    this.formError = '';
    this.form.imageName = file.name;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX = 600;

        if (width > height) {
          if (width > MAX) {
            height = Math.round(height * MAX / width);
            width = MAX;
          }
        } else {
          if (height > MAX) {
            width = Math.round(width * MAX / height);
            height = MAX;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/jpeg', 0.75);
        this.imagePreview = compressed;
        this.form.image = compressed;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imagePreview = null;
    this.form.image = '';
    this.form.imageName = '';
  }

  edit(s: any) {
    this.form = {
      name:        s.name || '',
      description: s.description || '',
      price:       s.price || 0,
      duration:    s.duration || '',
      category:    s.category || '',
      image:       s.image || '',
      imageName:   s.image ? 'existing-image.jpg' : '',
      isActive:    s.isActive
    };
    this.imagePreview = s.image || null;
    this.editing      = true;
    this.editId       = s._id;
    this.showForm     = true;
    this.submitted    = false;
    this.formError    = '';
    this.formSuccess  = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  save() {
    this.submitted = true;
    this.formError = '';

    if (!this.form.name.trim()) {
      this.formError = 'Service name is required'; return;
    }
    if (!this.form.price || this.form.price <= 0) {
      this.formError = 'Please enter a valid price'; return;
    }
    if (!this.form.category) {
      this.formError = 'Please select a category'; return;
    }

    this.saving = true;

    const payload = {
      name:        this.form.name.trim(),
      description: this.form.description.trim(),
      price:       Number(this.form.price),
      duration:    this.form.duration.trim(),
      category:    this.form.category,
      image:       this.form.image,
      isActive:    this.form.isActive
    };

    if (this.editing) {
      this.api.updateService(this.editId, payload).subscribe({
        next: () => {
          this.saving = false;
          this.formSuccess = 'Service updated successfully!';
          setTimeout(() => { this.cancel(); this.load(); }, 1200);
        },
        error: (err) => {
          this.saving = false;
          this.formError = err.error?.message || 'Failed to update service';
        }
      });
    } else {
      this.api.addService(payload).subscribe({
        next: () => {
          this.saving = false;
          this.formSuccess = 'Service added successfully!';
          setTimeout(() => { this.cancel(); this.load(); }, 1200);
        },
        error: (err) => {
          this.saving = false;
          this.formError = err.error?.message || 'Failed to add service';
        }
      });
    }
  }

  toggle(s: any) {
    this.api.updateService(s._id, { isActive: !s.isActive }).subscribe({
      next: () => this.load()
    });
  }

  deleteService(id: string) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.api.deleteService(id).subscribe({ next: () => this.load() });
    }
  }

  cancel() {
    this.showForm     = false;
    this.editing      = false;
    this.editId       = '';
    this.saving       = false;
    this.submitted    = false;
    this.formError    = '';
    this.formSuccess  = '';
    this.imagePreview = null;
    this.form = {
      name: '', description: '', price: 0,
      duration: '', category: '', image: '', imageName: '', isActive: true
    };
  }
}