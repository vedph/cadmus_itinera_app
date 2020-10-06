import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPartComponent } from './person-part.component';

describe('PersonPartComponent', () => {
  let component: PersonPartComponent;
  let fixture: ComponentFixture<PersonPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
