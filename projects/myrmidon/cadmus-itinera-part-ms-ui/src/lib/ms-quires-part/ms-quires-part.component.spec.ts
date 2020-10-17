import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsQuiresPartComponent } from './ms-quires-part.component';

describe('MsQuiresPartComponent', () => {
  let component: MsQuiresPartComponent;
  let fixture: ComponentFixture<MsQuiresPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsQuiresPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsQuiresPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
