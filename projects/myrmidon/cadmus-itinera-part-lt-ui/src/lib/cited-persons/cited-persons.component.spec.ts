import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitedPersonsComponent } from './cited-persons.component';

describe('CitedPersonsComponent', () => {
  let component: CitedPersonsComponent;
  let fixture: ComponentFixture<CitedPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitedPersonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitedPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
