import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsContentLociPartFeatureComponent } from './ms-content-loci-part-feature.component';

describe('MsContentLociPartFeatureComponent', () => {
  let component: MsContentLociPartFeatureComponent;
  let fixture: ComponentFixture<MsContentLociPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsContentLociPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsContentLociPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
