import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgForOf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-color-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './color-form.component.html',
  styleUrl: './color-form.component.scss'
})
export class ColorFormComponent {
  @Input() form!: FormGroup;
  @Input() colors: string[] = [];
  @Output() submitted = new EventEmitter<void>();

  errors = {
    rows: {
      required: 'Rows are required',
      min: 'Minimum value is 1',
      max: 'Maximum value is 1000'
    },
    cols: {
      required: 'Columns are required',
      min: 'Minimum value is 1',
      max: 'Maximum value is 702'
    },
    color: {
      required: 'Color is required'
    }
  };

  isTouchedAndInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.invalid;
  }

  getErrorKeys(controlName: string): string[] {
    const control = this.form.get(controlName);
    return control?.errors ? Object.keys(control.errors) : [];
  }

  getErrorMessage(field: keyof typeof this.errors, errorKey: string): string {
    return this.errors[field][errorKey as keyof typeof this.errors[typeof field]];
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit();
  }
}
