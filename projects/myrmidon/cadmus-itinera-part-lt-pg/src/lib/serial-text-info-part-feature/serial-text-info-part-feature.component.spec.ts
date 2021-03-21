import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialTextInfoPartFeatureComponent } from './serial-text-info-part-feature.component';

describe('SerialTextInfoPartFeatureComponent', () => {
  let component: SerialTextInfoPartFeatureComponent;
  let fixture: ComponentFixture<SerialTextInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialTextInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialTextInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
