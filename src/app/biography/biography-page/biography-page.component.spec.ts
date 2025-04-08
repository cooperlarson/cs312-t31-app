import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyPageComponent } from './biography-page.component';

describe('BiographyPageComponent', () => {
  let component: BiographyPageComponent;
  let fixture: ComponentFixture<BiographyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiographyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiographyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
