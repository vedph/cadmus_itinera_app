import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDimensionsPartComponent } from './ms-dimensions-part.component';

describe('MsDimensionsPartComponent', () => {
  let component: MsDimensionsPartComponent;
  let fixture: ComponentFixture<MsDimensionsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDimensionsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDimensionsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
