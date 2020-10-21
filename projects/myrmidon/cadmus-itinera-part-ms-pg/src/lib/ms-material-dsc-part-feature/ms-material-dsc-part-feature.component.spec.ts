import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMaterialDscPartFeatureComponent } from './ms-material-dsc-part-feature.component';

describe('MsMaterialDscPartFeatureComponent', () => {
  let component: MsMaterialDscPartFeatureComponent;
  let fixture: ComponentFixture<MsMaterialDscPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsMaterialDscPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsMaterialDscPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
