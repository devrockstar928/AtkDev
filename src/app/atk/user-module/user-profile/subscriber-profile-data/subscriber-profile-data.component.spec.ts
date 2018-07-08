import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberProfileDataComponent } from './subscriber-profile-data.component';

describe('SubscriberProfileDataComponent', () => {
  let component: SubscriberProfileDataComponent;
  let fixture: ComponentFixture<SubscriberProfileDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberProfileDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
