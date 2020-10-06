import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadmusItineraUiComponent } from './cadmus-itinera-ui.component';

describe('CadmusItineraUiComponent', () => {
  let component: CadmusItineraUiComponent;
  let fixture: ComponentFixture<CadmusItineraUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadmusItineraUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadmusItineraUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
