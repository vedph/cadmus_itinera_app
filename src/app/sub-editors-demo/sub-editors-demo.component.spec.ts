import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEditorsDemoComponent } from './sub-editors-demo.component';

describe('SubEditorsDemoComponent', () => {
  let component: SubEditorsDemoComponent;
  let fixture: ComponentFixture<SubEditorsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubEditorsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEditorsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
