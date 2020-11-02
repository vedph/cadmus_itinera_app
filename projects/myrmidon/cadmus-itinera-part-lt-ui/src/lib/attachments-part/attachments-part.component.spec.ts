import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsPartComponent } from './attachments-part.component';

describe('AttachmentsPartComponent', () => {
  let component: AttachmentsPartComponent;
  let fixture: ComponentFixture<AttachmentsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
