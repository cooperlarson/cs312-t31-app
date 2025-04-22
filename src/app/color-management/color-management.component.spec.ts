import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorManagementComponent } from './color-management.component';

describe('ColorManagementComponent', () => {
  let component: ColorManagementComponent;
  let fixture: ComponentFixture<ColorManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
