import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPlacePartComponent } from './ms-place-part.component';

describe('MsPlacePartComponent', () => {
  let component: MsPlacePartComponent;
  let fixture: ComponentFixture<MsPlacePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsPlacePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPlacePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
