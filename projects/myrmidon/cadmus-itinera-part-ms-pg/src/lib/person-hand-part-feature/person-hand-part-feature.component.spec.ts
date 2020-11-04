import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHandPartFeatureComponent } from './person-hand-part-feature.component';

describe('PersonHandPartFeatureComponent', () => {
  let component: PersonHandPartFeatureComponent;
  let fixture: ComponentFixture<PersonHandPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonHandPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHandPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
