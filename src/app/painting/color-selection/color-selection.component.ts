import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-color-selection',
  standalone: true,
  imports: [NgForOf, TitleCasePipe],
  templateUrl: './color-selection.component.html',
  styleUrl: './color-selection.component.scss'
})
export class ColorSelectionComponent {
  @Input() rows: { selected: boolean; color: string }[] = [];
  @Input() allColors: string[] = [];

  @Output() rowSelected = new EventEmitter<number>();
  @Output() colorChanged = new EventEmitter<{ index: number; color: string }>();

  onSelect(index: number) {
    this.rowSelected.emit(index);
  }

  onColorChange(index: number, event: Event) {
    const newColor = (event.target as HTMLSelectElement).value;
    this.colorChanged.emit({ index, color: newColor });
  }

  getAvailableColors(index: number): string[] {
    return this.allColors.filter(color =>
      !this.rows.some((row, i) => row.color === color && i !== index)
    );
  }
}
