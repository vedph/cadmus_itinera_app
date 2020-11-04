import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHandPartComponent } from './person-hand-part.component';

describe('PersonHandPartComponent', () => {
  let component: PersonHandPartComponent;
  let fixture: ComponentFixture<PersonHandPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonHandPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHandPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
