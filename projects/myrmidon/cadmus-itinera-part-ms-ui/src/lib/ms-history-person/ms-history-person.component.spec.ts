import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsHistoryPersonComponent } from './ms-history-person.component';

describe('MsHistoryPersonComponent', () => {
  let component: MsHistoryPersonComponent;
  let fixture: ComponentFixture<MsHistoryPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsHistoryPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsHistoryPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
