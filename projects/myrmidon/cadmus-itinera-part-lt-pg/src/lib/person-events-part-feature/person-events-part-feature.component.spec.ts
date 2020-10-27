import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEventsPartFeatureComponent } from './person-events-part-feature.component';

describe('PersonEventsPartFeatureComponent', () => {
  let component: PersonEventsPartFeatureComponent;
  let fixture: ComponentFixture<PersonEventsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEventsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEventsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
