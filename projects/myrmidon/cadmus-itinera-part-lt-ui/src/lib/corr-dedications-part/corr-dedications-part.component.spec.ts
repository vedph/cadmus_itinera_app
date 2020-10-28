import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrDedicationsPartComponent } from './corr-dedications-part.component';

describe('CorrDedicationsPartComponent', () => {
  let component: CorrDedicationsPartComponent;
  let fixture: ComponentFixture<CorrDedicationsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrDedicationsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrDedicationsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
