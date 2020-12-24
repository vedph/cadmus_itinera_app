import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLayoutsPartFeatureComponent } from './ms-layouts-part-feature.component';

describe('MsLayoutsPartFeatureComponent', () => {
  let component: MsLayoutsPartFeatureComponent;
  let fixture: ComponentFixture<MsLayoutsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLayoutsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsLayoutsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
