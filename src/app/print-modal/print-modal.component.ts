import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-print-modal',
  imports: [],
  templateUrl: './print-modal.component.html',
  styleUrl: './print-modal.component.scss'
})
export class PrintModalComponent {
  @Output() onDecision = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter<void>();

  confirm(grayscale: boolean) {
    this.onDecision.emit(grayscale);
  }

  cancel() {
    this.onCancel.emit();
  }
}
