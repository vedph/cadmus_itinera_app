import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsNumberingsPartComponent } from './ms-numberings-part.component';

describe('MsNumberingsPartComponent', () => {
  let component: MsNumberingsPartComponent;
  let fixture: ComponentFixture<MsNumberingsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsNumberingsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsNumberingsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
