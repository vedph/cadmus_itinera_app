import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrPseudonymComponent } from './corr-pseudonym.component';

describe('CorrPseudonymComponent', () => {
  let component: CorrPseudonymComponent;
  let fixture: ComponentFixture<CorrPseudonymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrPseudonymComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrPseudonymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
