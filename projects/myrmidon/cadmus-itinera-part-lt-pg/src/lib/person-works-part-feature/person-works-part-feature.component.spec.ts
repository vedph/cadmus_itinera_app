import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonWorksPartFeatureComponent } from './person-works-part-feature.component';

describe('PersonWorksPartFeatureComponent', () => {
  let component: PersonWorksPartFeatureComponent;
  let fixture: ComponentFixture<PersonWorksPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonWorksPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonWorksPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
