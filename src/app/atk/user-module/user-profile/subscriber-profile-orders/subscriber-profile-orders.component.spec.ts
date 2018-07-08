import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberProfileOrdersComponent } from './subscriber-profile-orders.component';

describe('SubscriberProfileOrdersComponent', () => {
  let component: SubscriberProfileOrdersComponent;
  let fixture: ComponentFixture<SubscriberProfileOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberProfileOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberProfileOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
