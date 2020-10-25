import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsRestorationComponent } from './ms-restoration.component';

describe('MsRestorationComponent', () => {
  let component: MsRestorationComponent;
  let fixture: ComponentFixture<MsRestorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsRestorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsRestorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
