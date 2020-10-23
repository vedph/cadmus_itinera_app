import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDecorationArtistComponent } from './ms-decoration-artist.component';

describe('MsDecorationArtistComponent', () => {
  let component: MsDecorationArtistComponent;
  let fixture: ComponentFixture<MsDecorationArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDecorationArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDecorationArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
