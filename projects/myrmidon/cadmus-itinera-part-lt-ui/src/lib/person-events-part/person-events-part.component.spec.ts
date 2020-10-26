import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEventsPartComponent } from './person-events-part.component';

describe('PersonEventsPartComponent', () => {
  let component: PersonEventsPartComponent;
  let fixture: ComponentFixture<PersonEventsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEventsPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEventsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
