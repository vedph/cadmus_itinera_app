import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsContentLociPartComponent } from './ms-content-loci-part.component';

describe('MsContentLociPartComponent', () => {
  let component: MsContentLociPartComponent;
  let fixture: ComponentFixture<MsContentLociPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsContentLociPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsContentLociPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
