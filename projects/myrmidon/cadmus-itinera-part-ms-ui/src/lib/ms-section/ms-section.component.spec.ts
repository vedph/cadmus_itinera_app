import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSectionComponent } from './ms-section.component';

describe('MsSectionComponent', () => {
  let component: MsSectionComponent;
  let fixture: ComponentFixture<MsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
