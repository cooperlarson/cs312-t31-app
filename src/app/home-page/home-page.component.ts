import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorFormComponent } from '../color-form/color-form.component';
import { NgIf } from '@angular/common';
import { PrintModalComponent } from '../print-modal/print-modal.component';

@Component({
  selector: 'app-home-page',
  imports: [NgIf, ReactiveFormsModule, ColorFormComponent, PrintModalComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  header_title = 'HueGrid';
  header_subtitle = 'Your Color Palette Companion';

  logo = {
    src: 'images/HueGrid_logo.png',
    alt: 'HueGrid Logo',
  };

  showPrintModal = false;

  formState = 1;
  form!: FormGroup;
  formData = {
    rows: 0,
    cols: 0,
    color: ''
  };

  colors = [
    'red', 'blue', 'green', 'purple', 'pink',
    'yellow', 'orange', 'black', 'white', 'brown'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rows: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
      cols: [1, [Validators.required, Validators.min(1), Validators.max(702)]],
      color: ['', Validators.required]
    });
  }

  onFormSubmitted(): void {
    this.formData = this.form.value;
    console.log('Form Data Received:', this.formData);
    ++this.formState; // Increment form state to show the next step
  }

  triggerPrint(): void {
    this.showPrintModal = true;
  }

  handlePrint(grayscale: boolean) {
    this.showPrintModal = false;

    if (grayscale) {
      document.body.classList.add('grayscale-mode');
    }

    document.body.classList.add('print-mode');
    this.prepareDOMForPrint();

    setTimeout(() => {
      window.print();
      document.body.classList.remove('print-mode');
      document.body.classList.remove('grayscale-mode');
      this.restoreDOMAfterPrint();
    }, 100);
  }

  prepareDOMForPrint(): void {
    const dropdowns = document.querySelectorAll('.dropdown, .radio-group, .interactive-ui');
    dropdowns.forEach(el => el.classList.add('print-hidden'));
  }

  restoreDOMAfterPrint(): void {
    const hiddenEls = document.querySelectorAll('.print-hidden');
    hiddenEls.forEach(el => el.classList.remove('print-hidden'));
  }
}
