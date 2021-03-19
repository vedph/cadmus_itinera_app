import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitDedicationsPartComponent } from './lit-dedications-part.component';

describe('LitDedicationsPartComponent', () => {
  let component: LitDedicationsPartComponent;
  let fixture: ComponentFixture<LitDedicationsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitDedicationsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitDedicationsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
