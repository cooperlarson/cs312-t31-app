import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintModalComponent } from './print-modal.component';

describe('PrintModalComponent', () => {
  let component: PrintModalComponent;
  let fixture: ComponentFixture<PrintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
