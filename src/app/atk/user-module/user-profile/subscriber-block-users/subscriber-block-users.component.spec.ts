import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberBlockUsersComponent } from './subscriber-block-users.component';

describe('SubscriberBlockUsersComponent', () => {
  let component: SubscriberBlockUsersComponent;
  let fixture: ComponentFixture<SubscriberBlockUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberBlockUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberBlockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
