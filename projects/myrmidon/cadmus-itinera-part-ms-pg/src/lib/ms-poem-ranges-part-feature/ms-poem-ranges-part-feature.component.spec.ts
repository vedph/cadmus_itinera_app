import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPoemRangesPartFeatureComponent } from './ms-poem-ranges-part-feature.component';

describe('MsPoemRangesPartFeatureComponent', () => {
  let component: MsPoemRangesPartFeatureComponent;
  let fixture: ComponentFixture<MsPoemRangesPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsPoemRangesPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPoemRangesPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
