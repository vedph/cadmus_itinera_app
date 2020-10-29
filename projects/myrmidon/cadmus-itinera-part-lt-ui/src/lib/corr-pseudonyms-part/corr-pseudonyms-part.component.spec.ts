import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrPseudonymsPartComponent } from './corr-pseudonyms-part.component';

describe('CorrPseudonymsPartComponent', () => {
  let component: CorrPseudonymsPartComponent;
  let fixture: ComponentFixture<CorrPseudonymsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrPseudonymsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrPseudonymsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
