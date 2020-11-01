import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoeticTextInfoPartFeatureComponent } from './poetic-text-info-part-feature.component';

describe('PoeticTextInfoPartFeatureComponent', () => {
  let component: PoeticTextInfoPartFeatureComponent;
  let fixture: ComponentFixture<PoeticTextInfoPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoeticTextInfoPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoeticTextInfoPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
