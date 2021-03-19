import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitDedicationsPartFeatureComponent } from './lit-dedications-part-feature.component';

describe('LitDedicationsPartFeatureComponent', () => {
  let component: LitDedicationsPartFeatureComponent;
  let fixture: ComponentFixture<LitDedicationsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitDedicationsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitDedicationsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
