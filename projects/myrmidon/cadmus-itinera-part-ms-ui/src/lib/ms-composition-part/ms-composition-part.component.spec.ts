import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsCompositionPartComponent } from './ms-composition-part.component';

describe('MsCompositionPartComponent', () => {
  let component: MsCompositionPartComponent;
  let fixture: ComponentFixture<MsCompositionPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsCompositionPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsCompositionPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
