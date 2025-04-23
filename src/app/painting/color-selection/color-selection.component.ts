import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { Color, SelectionRow } from '../../../util';

@Component({
  selector: 'app-color-selection',
  standalone: true,
  imports: [NgForOf, TitleCasePipe, NgIf],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.scss'
})
export class ColorSelectionComponent {
  @Input() rows: SelectionRow[] = [];
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
      !this.rows.some((row, i) => row.row.color === color && i !== index)
    );
  }
}
