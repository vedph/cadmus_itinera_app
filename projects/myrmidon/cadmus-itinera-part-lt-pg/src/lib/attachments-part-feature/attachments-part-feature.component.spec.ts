import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsPartFeatureComponent } from './attachments-part-feature.component';

describe('AttachmentsPartFeatureComponent', () => {
  let component: AttachmentsPartFeatureComponent;
  let fixture: ComponentFixture<AttachmentsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
