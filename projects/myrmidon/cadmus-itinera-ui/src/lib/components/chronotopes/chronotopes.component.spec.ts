import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronotopesComponent } from './chronotopes.component';

describe('ChronotopesComponent', () => {
  let component: ChronotopesComponent;
  let fixture: ComponentFixture<ChronotopesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronotopesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronotopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
