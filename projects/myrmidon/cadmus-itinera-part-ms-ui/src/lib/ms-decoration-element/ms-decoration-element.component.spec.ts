import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDecorationElementComponent } from './ms-decoration-element.component';

describe('MsDecorationElementComponent', () => {
  let component: MsDecorationElementComponent;
  let fixture: ComponentFixture<MsDecorationElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDecorationElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDecorationElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
