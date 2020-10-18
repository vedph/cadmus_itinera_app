import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsWatermarkComponent } from './ms-watermark.component';

describe('MsWatermarkComponent', () => {
  let component: MsWatermarkComponent;
  let fixture: ComponentFixture<MsWatermarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsWatermarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsWatermarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
