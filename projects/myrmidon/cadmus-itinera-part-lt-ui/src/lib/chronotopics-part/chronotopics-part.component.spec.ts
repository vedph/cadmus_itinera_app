import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronotopicsPartComponent } from './chronotopics-part.component';

describe('ChronotopicsPartComponent', () => {
  let component: ChronotopicsPartComponent;
  let fixture: ComponentFixture<ChronotopicsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronotopicsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronotopicsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
