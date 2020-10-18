import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsCatchwordsPartFeatureComponent } from './ms-catchwords-part-feature.component';

describe('MsCatchwordsPartFeatureComponent', () => {
  let component: MsCatchwordsPartFeatureComponent;
  let fixture: ComponentFixture<MsCatchwordsPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsCatchwordsPartFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsCatchwordsPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
