import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingGridComponent } from './painting-grid.component';

describe('PaintingGridComponent', () => {
  let component: PaintingGridComponent;
  let fixture: ComponentFixture<PaintingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaintingGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
