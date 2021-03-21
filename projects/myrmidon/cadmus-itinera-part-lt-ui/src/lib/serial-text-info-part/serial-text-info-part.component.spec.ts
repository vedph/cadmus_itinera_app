import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerialTextInfoPartComponent } from './serial-text-info-part.component';

describe('LetterInfoPartComponent', () => {
  let component: SerialTextInfoPartComponent;
  let fixture: ComponentFixture<SerialTextInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerialTextInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerialTextInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
