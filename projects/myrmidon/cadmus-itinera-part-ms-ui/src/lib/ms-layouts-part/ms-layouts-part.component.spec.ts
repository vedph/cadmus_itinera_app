import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLayoutsPartComponent } from './ms-layouts-part.component';

describe('MsLayoutsPartComponent', () => {
  let component: MsLayoutsPartComponent;
  let fixture: ComponentFixture<MsLayoutsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLayoutsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsLayoutsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
