import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsWatermarksPartFeatureComponent } from './ms-watermarks-part-feature.component';

describe('MsWatermarksPartFeatureComponent', () => {
  let component: MsWatermarksPartFeatureComponent;
  let fixture: ComponentFixture<MsWatermarksPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsWatermarksPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsWatermarksPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
