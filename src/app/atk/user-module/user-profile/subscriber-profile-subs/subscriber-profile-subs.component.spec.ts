import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberProfileSubsComponent } from './subscriber-profile-subs.component';

describe('SubscriberProfileSubsComponent', () => {
  let component: SubscriberProfileSubsComponent;
  let fixture: ComponentFixture<SubscriberProfileSubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberProfileSubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberProfileSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
