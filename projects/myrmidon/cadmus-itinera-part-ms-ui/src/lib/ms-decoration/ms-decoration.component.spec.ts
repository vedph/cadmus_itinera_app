import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDecorationComponent } from './ms-decoration.component';

describe('MsDecorationComponent', () => {
  let component: MsDecorationComponent;
  let fixture: ComponentFixture<MsDecorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDecorationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
