import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPartFeatureComponent } from './person-part-feature.component';

describe('PersonPartFeatureComponent', () => {
  let component: PersonPartFeatureComponent;
  let fixture: ComponentFixture<PersonPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
