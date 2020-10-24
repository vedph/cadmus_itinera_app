import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDecorationsPartFeatureComponent } from './ms-decorations-part-feature.component';

describe('MsDecorationsPartFeatureComponent', () => {
  let component: MsDecorationsPartFeatureComponent;
  let fixture: ComponentFixture<MsDecorationsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDecorationsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDecorationsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
