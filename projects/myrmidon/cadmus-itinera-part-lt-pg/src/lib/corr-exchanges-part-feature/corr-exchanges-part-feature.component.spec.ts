import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrExchangesPartFeatureComponent } from './corr-exchanges-part-feature.component';

describe('CorrExchangesPartFeatureComponent', () => {
  let component: CorrExchangesPartFeatureComponent;
  let fixture: ComponentFixture<CorrExchangesPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrExchangesPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrExchangesPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
