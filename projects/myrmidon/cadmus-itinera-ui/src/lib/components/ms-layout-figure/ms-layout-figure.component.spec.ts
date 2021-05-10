import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsLayoutFigureComponent } from './ms-layout-figure.component';

describe('MsLayoutFigureComponent', () => {
  let component: MsLayoutFigureComponent;
  let fixture: ComponentFixture<MsLayoutFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsLayoutFigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsLayoutFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
