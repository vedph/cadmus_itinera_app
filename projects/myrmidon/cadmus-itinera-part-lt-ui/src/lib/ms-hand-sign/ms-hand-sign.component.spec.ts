import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHandSignComponent } from './ms-hand-sign.component';

describe('MsHandSignComponent', () => {
  let component: MsHandSignComponent;
  let fixture: ComponentFixture<MsHandSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsHandSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHandSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
