import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrDedicationsPartFeatureComponent } from './corr-dedications-part-feature.component';

describe('CorrDedicationsPartFeatureComponent', () => {
  let component: CorrDedicationsPartFeatureComponent;
  let fixture: ComponentFixture<CorrDedicationsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrDedicationsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrDedicationsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
