import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsQuiresPartFeatureComponent } from './ms-quires-part-feature.component';

describe('MsQuiresPartFeatureComponent', () => {
  let component: MsQuiresPartFeatureComponent;
  let fixture: ComponentFixture<MsQuiresPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsQuiresPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsQuiresPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
