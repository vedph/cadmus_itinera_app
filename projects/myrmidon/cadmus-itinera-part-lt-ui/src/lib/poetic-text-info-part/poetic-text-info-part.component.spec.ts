import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeticTextInfoPartComponent } from './poetic-text-info-part.component';

describe('PoeticTextInfoPartComponent', () => {
  let component: PoeticTextInfoPartComponent;
  let fixture: ComponentFixture<PoeticTextInfoPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeticTextInfoPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeticTextInfoPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
