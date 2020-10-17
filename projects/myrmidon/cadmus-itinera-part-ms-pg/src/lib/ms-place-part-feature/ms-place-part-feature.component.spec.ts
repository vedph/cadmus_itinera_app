import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPlacePartFeatureComponent } from './ms-place-part-feature.component';

describe('MsPlacePartFeatureComponent', () => {
  let component: MsPlacePartFeatureComponent;
  let fixture: ComponentFixture<MsPlacePartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsPlacePartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPlacePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
