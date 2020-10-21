import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsBindingPartFeatureComponent } from './ms-binding-part-feature.component';

describe('MsBindingPartFeatureComponent', () => {
  let component: MsBindingPartFeatureComponent;
  let fixture: ComponentFixture<MsBindingPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsBindingPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsBindingPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
