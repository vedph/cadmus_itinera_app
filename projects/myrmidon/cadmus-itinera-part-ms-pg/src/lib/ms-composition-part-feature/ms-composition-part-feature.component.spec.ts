import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsCompositionPartFeatureComponent } from './ms-composition-part-feature.component';

describe('MsCompositionPartFeatureComponent', () => {
  let component: MsCompositionPartFeatureComponent;
  let fixture: ComponentFixture<MsCompositionPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsCompositionPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsCompositionPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
