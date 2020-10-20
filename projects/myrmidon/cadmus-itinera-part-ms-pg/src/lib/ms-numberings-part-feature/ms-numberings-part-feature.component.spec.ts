import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsNumberingsPartFeatureComponent } from './ms-numberings-part-feature.component';

describe('MsNumberingsPartFeatureComponent', () => {
  let component: MsNumberingsPartFeatureComponent;
  let fixture: ComponentFixture<MsNumberingsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsNumberingsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsNumberingsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
