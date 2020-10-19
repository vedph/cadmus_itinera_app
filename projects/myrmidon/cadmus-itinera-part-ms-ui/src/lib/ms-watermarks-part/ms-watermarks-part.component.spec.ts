import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsWatermarksPartComponent } from './ms-watermarks-part.component';

describe('MsWatermarksPartComponent', () => {
  let component: MsWatermarksPartComponent;
  let fixture: ComponentFixture<MsWatermarksPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsWatermarksPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsWatermarksPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
