import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHandsPartFeatureComponent } from './ms-hands-part-feature.component';

describe('MsHandsPartFeatureComponent', () => {
  let component: MsHandsPartFeatureComponent;
  let fixture: ComponentFixture<MsHandsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsHandsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHandsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
