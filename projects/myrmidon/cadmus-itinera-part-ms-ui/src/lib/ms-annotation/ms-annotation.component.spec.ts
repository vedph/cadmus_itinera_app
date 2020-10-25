import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsAnnotationComponent } from './ms-annotation.component';

describe('MsAnnotationComponent', () => {
  let component: MsAnnotationComponent;
  let fixture: ComponentFixture<MsAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsAnnotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
