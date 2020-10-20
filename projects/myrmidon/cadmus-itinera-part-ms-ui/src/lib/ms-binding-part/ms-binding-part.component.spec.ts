import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsBindingPartComponent } from './ms-binding-part.component';

describe('MsBindingPartComponent', () => {
  let component: MsBindingPartComponent;
  let fixture: ComponentFixture<MsBindingPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsBindingPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsBindingPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
