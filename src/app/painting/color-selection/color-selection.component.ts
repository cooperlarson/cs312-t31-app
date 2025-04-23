import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, TitleCasePipe } from '@angular/common';
import { Color, ColorRow } from '../../../util';

@Component({
  selector: 'app-color-selection',
  standalone: true,
  imports: [NgForOf, TitleCasePipe],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.scss'
})
export class ColorSelectionComponent {
  @Input() rows: ColorRow[] = [];
  @Input() allColors: Color[] = [];

  @Output() rowSelected = new EventEmitter<number>();
  @Output() colorChanged = new EventEmitter<{ index: number; color: Color }>();

  onSelect(index: number) {
    this.rowSelected.emit(index);
  }

  onColorChange(index: number, event: Event) {
    const selectedHex = (event.target as HTMLSelectElement).value;
    const newColor = this.allColors.find(c => c.hex === selectedHex);

    if (newColor) this.colorChanged.emit({ index, color: newColor });
    else console.warn('Selected color not found in color list:', selectedHex);
  }

  getAvailableColors(index: number): Color[] {
    return this.allColors.filter(color =>
      !this.rows.some((row, i) => row.color === color && i !== index)
    );
  }
}
