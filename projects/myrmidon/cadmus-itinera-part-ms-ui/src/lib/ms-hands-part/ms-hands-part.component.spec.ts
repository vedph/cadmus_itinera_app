import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHandsPartComponent } from './ms-hands-part.component';

describe('MsHandsPartComponent', () => {
  let component: MsHandsPartComponent;
  let fixture: ComponentFixture<MsHandsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsHandsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHandsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
