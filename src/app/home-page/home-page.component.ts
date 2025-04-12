import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColorFormComponent } from '../color-form/color-form.component';
import { NgIf } from '@angular/common';
import { PrintModalComponent } from '../print-modal/print-modal.component';
import { ColorSelectionComponent } from '../painting/color-selection/color-selection.component';
import { PaintingGridComponent } from '../painting/painting-grid/painting-grid.component';

@Component({
  selector: 'app-home-page',
  imports: [NgIf, ReactiveFormsModule, ColorFormComponent, PrintModalComponent, ColorSelectionComponent,PaintingGridComponent],
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
  printMode = false;

  formState = 1;  // Global form state

  /////////// COLOR FORM ///////////

  form!: FormGroup;
  formData = {
    rows: 0,
    cols: 0,
    color: 0
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      rows: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
      cols: [1, [Validators.required, Validators.min(1), Validators.max(702)]],
      color: [1, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  onFormSubmitted(): void {
    this.formData = this.form.value;
    console.log('Form Data Received:', this.formData);
    this.initColorTable(this.formData.color);
    this.initPaintingGrid(this.formData.rows, this.formData.cols);
    ++this.formState; // Increment form state to show the next step
  }

  /////////// PAINTING GRID ///////////

  // THIS SHOULD NOT BE DELETED, USED WITH 'painting-grid.component.ts'
  paintingGridColCount: number = 0;
  paintingGridRowCount: number = 0;

  initPaintingGrid(rowCount: number, colCount: number) {
    this.paintingGridColCount = colCount;
    this.paintingGridRowCount = rowCount;
  }

  /////////// COLOR SELECTION TABLE ///////////

  // THIS SHOULD NOT BE DELETED, USED WITH 'color-selection.component.ts'
  colorTableRows: { selected: boolean, color: string }[] = [];
  colors: string[] = [
    'red', 'orange', 'yellow', 'green', 'blue',
    'purple', 'grey', 'brown', 'black', 'teal'
  ];

  initColorTable(rowCount: number) {
    this.colorTableRows = [];
    for (let i = 0; i < rowCount; i++) {
      this.colorTableRows.push({
        selected: false,
        color: this.colors[i % this.colors.length]
      });
    }
  }

  handleRowSelected(index: number) {
    this.colorTableRows.forEach((row, i) => row.selected = i === index);
  }

  handleColorChange(event: { index: number, color: string }) {
    const { index, color } = event;

    // Prevent duplicate colors
    const isUsed = this.colorTableRows.some((row, i) => row.color === color && i !== index);
    if (isUsed) {
      alert('Color already used. Pick a different one.');
      return;
    }

    this.colorTableRows[index].color = color;
  }

  ///////////// FORM RESET ///////////

  resetForm() {
    this.formState = 1;
    this.form.reset();
    this.formData = {
      rows: 0,
      cols: 0,
      color: 0
    }
    this.colorTableRows = [];
    this.paintingGridColCount = 0;
    this.paintingGridRowCount = 0;
  }

  backToForm() {
    --this.formState;
  }

  ///////////// PRINTING ///////////

  triggerPrint(): void {
    this.showPrintModal = true;
  }

  handlePrint(grayscale: boolean) {
    this.showPrintModal = false;
    this.printMode = true;

    if (grayscale) {
      document.body.classList.add('grayscale-mode');
    }

    document.body.classList.add('print-mode');
    this.prepareDOMForPrint();

    setTimeout(() => {
      window.print();
      document.body.classList.remove('print-mode');
      document.body.classList.remove('grayscale-mode');

      // Restore the print mode
      this.printMode = false;
      this.restoreDOMAfterPrint();
    }, 100);
  }

  prepareDOMForPrint(): void {
    const navbar = document.querySelector('.navbar');
    navbar && navbar.classList.add('print-mode');

    const header = document.querySelector('header');
    header && header.classList.add('print-hidden');

    const colorSelectionIntro = document.querySelector('.app-color-selection-intro');
    colorSelectionIntro && colorSelectionIntro.classList.add('print-mode');

    const colorSelectionTable = document.querySelector('.color-selection-table');
    colorSelectionTable && colorSelectionTable.classList.add('print-mode');

    const paintingGrid = document.querySelector('.painting-grid');
    paintingGrid && paintingGrid.classList.add('print-mode');

    const paintingGridIntro = document.querySelector('.color-painting-intro');
    paintingGridIntro && paintingGridIntro.classList.add('print-mode');

    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('print-mode'));

    const footer = document.querySelector('footer');
    footer && footer.classList.add('print-hidden');
  }

  restoreDOMAfterPrint(): void {
    const hiddenEls = document.querySelectorAll('.print-hidden');
    hiddenEls.forEach(el => el.classList.remove('print-hidden'));

    const printModeEls = document.querySelectorAll('.print-mode');
    printModeEls.forEach(el => el.classList.remove('print-mode'));
  }
}
