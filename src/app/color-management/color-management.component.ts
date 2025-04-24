import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Color, loadColors } from '../../util';
import { COLORS_API_ENDPOINT } from '../../globals';


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
  minimumColors = 1;
  addColorWarning: string | null = null;

  constructor(private fb: FormBuilder) {
    this.addColorForm = this.fb.group({
      name: [''],
      hex: ['#000000']
    });
  }

  ngOnInit(): void {
    loadColors(this.http).subscribe({
      next: (data) => this.colors = data,
      error: (err) => {
        console.error('Failed to load colors:', err);
        alert('Error loading colors. Check server logs or port.');
      }
    });
  }

  onColorPickerChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.addColorForm.patchValue({ hex: value });
  }

  addColor(): void {
    this.addColorWarning = null;
    const newColor = this.addColorForm.value;

    if (this.colors.some(c => c.name === newColor.name || c.hex === newColor.hex)) {
      this.addColorWarning = 'Duplicate color name or hex value.';
      return;
    }

    this.http.post(COLORS_API_ENDPOINT, newColor).subscribe({
      next: (response: any) => {
        console.log('Color added:', response);

        const nextId = Math.max(0, ...this.colors.map(c => c.id ?? 0)) + 1;
        this.colors.push({ id: nextId, ...newColor });

        this.addColorForm.reset({ name: '', hex: '#000000' });
      },
      error: err => this.addColorWarning = 'Failed to add color: ' + err.message
    });
  }

  enableEdit(color: Color): void {
    color.warning = undefined;
    color.editing = true;
  }

  saveEdit(color: Color): void {
    color.warning = undefined;

    if (this.colors.some(c => (c.name === color.name || c.hex === color.hex) && c.id !== color.id)) {
      color.warning = 'Duplicate color name or hex value.';
      return;
    }

    this.http.put(COLORS_API_ENDPOINT, color).subscribe({
      next: (response: any) => {
        console.log('Color updated:', response);
      },
      error: err => color.warning = 'Failed to update color: ' + err.message
    });

    color.editing = false;
  }

  deleteColor(color: Color): void {
    if (this.colors.length <= this.minimumColors) {
      color.warning = 'You must keep at least one color.';
      return;
    }

    // Optional: Confirm removal
    if (confirm(`Delete ${color.name}?`)) {
      // TODO: Clear existing color.warning if not null
      // TODO: Replace with DELETE call to backend
      // TODO: Implement inline error handling by setting color.warning
      // TODO: Remove color from this.colors
      this.colors = this.colors.filter(c => c.id !== color.id);
    }
  }
}
