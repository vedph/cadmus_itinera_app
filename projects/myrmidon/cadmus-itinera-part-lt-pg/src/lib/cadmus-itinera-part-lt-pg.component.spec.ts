import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusItineraPartLtPgComponent } from './cadmus-itinera-part-lt-pg.component';

describe('CadmusItineraPartLtPgComponent', () => {
  let component: CadmusItineraPartLtPgComponent;
  let fixture: ComponentFixture<CadmusItineraPartLtPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusItineraPartLtPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusItineraPartLtPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
