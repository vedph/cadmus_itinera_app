import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronotopicsPartFeatureComponent } from './chronotopics-part-feature.component';

describe('ChronotopicsPartFeatureComponent', () => {
  let component: ChronotopicsPartFeatureComponent;
  let fixture: ComponentFixture<ChronotopicsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronotopicsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronotopicsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
