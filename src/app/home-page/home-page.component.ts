import { Component } from '@angular/core';
import { PrintModalComponent } from '../print-modal/print-modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    PrintModalComponent,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  header_title = 'HueGrid';
  header_subtitle = 'Your Color Palette Companion';
  logo = {
    src: 'images/HueGrid_logo.png',
    alt: 'HueGrid Logo',
  }

  showPrintModal = false;

  triggerPrint() {
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

  prepareDOMForPrint() {
    const dropdowns = document.querySelectorAll('.dropdown, .radio-group, .interactive-ui');
    dropdowns.forEach(el => el.classList.add('print-hidden'));

    // TODO - Cooper: remove any other elements that should not be printed
  }

  restoreDOMAfterPrint() {
    const hiddenEls = document.querySelectorAll('.print-hidden');
    hiddenEls.forEach(el => el.classList.remove('print-hidden'));

    // TODO - Cooper: restore any other elements that were hidden for printing
  }
}
