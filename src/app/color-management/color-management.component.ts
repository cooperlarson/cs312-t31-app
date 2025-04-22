import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Color {
  id: number;
  name: string;
  hex: string;
  editing?: boolean;
}

@Component({
  selector: 'app-color-management',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    HttpClientModule,
  ],
  templateUrl: './color-management.component.html',
  styleUrl: './color-management.component.scss'
})
export class ColorManagementComponent {
  private readonly http = inject(HttpClient);
  colors: Color[] = [];
  addColorForm: FormGroup;
  minimumColors = 2;

  constructor(private fb: FormBuilder) {
    this.addColorForm = this.fb.group({
      name: [''],
      hex: ['#000000']
    });
  }

  // Dynamically get the base URL, trim it, and append :8443
  base = window.location.origin.replace(/:\d+$/, '');
  endpoint = `${this.base}:8443/api/colors`;

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(): void {
    this.http.get<Color[]>(this.endpoint).subscribe({
      next: (data) => {
        this.colors = data;
      },
      error: (err) => {
        console.error('Failed to load colors:', err);
        alert('Error loading colors. Check server logs or port.');
      }
    });
  }

  addColor(): void {
    const newColor = this.addColorForm.value;
    // TODO: Replace with POST call to backend
    if (this.colors.some(c => c.name === newColor.name || c.hex === newColor.hex)) {
      alert('Duplicate color name or hex value.');
      return;
    }
    const nextId = Math.max(...this.colors.map(c => c.id)) + 1;
    this.colors.push({ id: nextId, ...newColor });
    this.addColorForm.reset({ name: '', hex: '#000000' });
  }

  enableEdit(color: Color): void {
    color.editing = true;
  }

  saveEdit(color: Color): void {
    // TODO: Replace with PUT call to backend
    color.editing = false;
  }

  deleteColor(color: Color): void {
    if (this.colors.length <= this.minimumColors) {
      alert('You must keep at least two colors.');
      return;
    }

    if (confirm(`Delete ${color.name}?`)) {
      // TODO: Replace with DELETE call to backend
      this.colors = this.colors.filter(c => c.id !== color.id);
    }
  }
}
