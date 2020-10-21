import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsMaterialDscPartComponent } from './ms-material-dsc-part.component';

describe('MsMaterialDscPartComponent', () => {
  let component: MsMaterialDscPartComponent;
  let fixture: ComponentFixture<MsMaterialDscPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsMaterialDscPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsMaterialDscPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
