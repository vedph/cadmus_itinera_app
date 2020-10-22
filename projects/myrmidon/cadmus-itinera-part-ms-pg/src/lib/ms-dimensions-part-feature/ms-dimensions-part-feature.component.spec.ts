import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDimensionsPartFeatureComponent } from './ms-dimensions-part-feature.component';

describe('MsDimensionsPartFeatureComponent', () => {
  let component: MsDimensionsPartFeatureComponent;
  let fixture: ComponentFixture<MsDimensionsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDimensionsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDimensionsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
