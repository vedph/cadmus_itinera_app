import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrExchangesPartComponent } from './corr-exchanges-part.component';

describe('CorrExchangesPartComponent', () => {
  let component: CorrExchangesPartComponent;
  let fixture: ComponentFixture<CorrExchangesPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrExchangesPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrExchangesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
