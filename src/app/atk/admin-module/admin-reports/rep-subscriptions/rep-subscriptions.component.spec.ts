import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepSubscriptionsComponent } from './rep-subscriptions.component';

describe('RepSubscriptionsComponent', () => {
  let component: RepSubscriptionsComponent;
  let fixture: ComponentFixture<RepSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
