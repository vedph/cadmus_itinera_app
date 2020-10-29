import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrPseudonymsPartFeatureComponent } from './corr-pseudonyms-part-feature.component';

describe('CorrPseudonymsPartFeatureComponent', () => {
  let component: CorrPseudonymsPartFeatureComponent;
  let fixture: ComponentFixture<CorrPseudonymsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrPseudonymsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrPseudonymsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
