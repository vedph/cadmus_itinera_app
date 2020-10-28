import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitDedicationComponent } from './lit-dedication.component';

describe('LitDedicationComponent', () => {
  let component: LitDedicationComponent;
  let fixture: ComponentFixture<LitDedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitDedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitDedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
