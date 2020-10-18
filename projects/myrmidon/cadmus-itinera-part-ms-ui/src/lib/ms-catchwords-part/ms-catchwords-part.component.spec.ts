import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsCatchwordsPartComponent } from './ms-catchwords-part.component';

describe('MsCatchwordsPartComponent', () => {
  let component: MsCatchwordsPartComponent;
  let fixture: ComponentFixture<MsCatchwordsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsCatchwordsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsCatchwordsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
