import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitedPersonsPartComponent } from './cited-persons-part.component';

describe('CitedPersonsPartComponent', () => {
  let component: CitedPersonsPartComponent;
  let fixture: ComponentFixture<CitedPersonsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitedPersonsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitedPersonsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
