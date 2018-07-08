import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonActionsComponent } from './add-button-actions.component';

describe('AddButtonActionsComponent', () => {
  let component: AddButtonActionsComponent;
  let fixture: ComponentFixture<AddButtonActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddButtonActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
