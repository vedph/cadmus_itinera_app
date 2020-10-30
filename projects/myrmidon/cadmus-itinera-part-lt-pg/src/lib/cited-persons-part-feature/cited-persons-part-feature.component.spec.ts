import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitedPersonsPartFeatureComponent } from './cited-persons-part-feature.component';

describe('CitedPersonsPartFeatureComponent', () => {
  let component: CitedPersonsPartFeatureComponent;
  let fixture: ComponentFixture<CitedPersonsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitedPersonsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitedPersonsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
