import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsContentLocusComponent } from './ms-content-locus.component';

describe('MsContentLocusComponent', () => {
  let component: MsContentLocusComponent;
  let fixture: ComponentFixture<MsContentLocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsContentLocusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsContentLocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
