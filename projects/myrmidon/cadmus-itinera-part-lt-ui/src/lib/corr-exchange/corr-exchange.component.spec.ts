import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrExchangeComponent } from './corr-exchange.component';

describe('CorrExchangeComponent', () => {
  let component: CorrExchangeComponent;
  let fixture: ComponentFixture<CorrExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrExchangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
