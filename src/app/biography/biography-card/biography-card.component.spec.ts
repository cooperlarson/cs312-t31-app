import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyCardComponent } from './biography-card.component';

describe('BiographyCardComponent', () => {
  let component: BiographyCardComponent;
  let fixture: ComponentFixture<BiographyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiographyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiographyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
