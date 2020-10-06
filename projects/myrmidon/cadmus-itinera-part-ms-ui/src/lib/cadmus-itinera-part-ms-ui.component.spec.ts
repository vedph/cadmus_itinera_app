import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusItineraPartMsUiComponent } from './cadmus-itinera-part-ms-ui.component';

describe('CadmusItineraPartMsUiComponent', () => {
  let component: CadmusItineraPartMsUiComponent;
  let fixture: ComponentFixture<CadmusItineraPartMsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusItineraPartMsUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusItineraPartMsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
