import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLayoutComponent } from './ms-layout.component';

describe('MsLayoutComponent', () => {
  let component: MsLayoutComponent;
  let fixture: ComponentFixture<MsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
