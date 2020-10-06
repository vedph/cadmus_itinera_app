import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusItineraPartMsPgComponent } from './cadmus-itinera-part-ms-pg.component';

describe('CadmusItineraPartMsPgComponent', () => {
  let component: CadmusItineraPartMsPgComponent;
  let fixture: ComponentFixture<CadmusItineraPartMsPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusItineraPartMsPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusItineraPartMsPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
