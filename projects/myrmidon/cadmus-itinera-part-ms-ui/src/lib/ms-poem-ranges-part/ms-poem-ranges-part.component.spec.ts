import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsPoemRangesPartComponent } from './ms-poem-ranges-part.component';

describe('MsPoemRangesPartComponent', () => {
  let component: MsPoemRangesPartComponent;
  let fixture: ComponentFixture<MsPoemRangesPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsPoemRangesPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsPoemRangesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
