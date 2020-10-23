import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsDecorationsPartComponent } from './ms-decorations-part.component';

describe('MsDecorationsPartComponent', () => {
  let component: MsDecorationsPartComponent;
  let fixture: ComponentFixture<MsDecorationsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsDecorationsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsDecorationsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
