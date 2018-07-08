import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberCommentsComponent } from './subscriber-comments.component';

describe('SubscriberCommentsComponent', () => {
  let component: SubscriberCommentsComponent;
  let fixture: ComponentFixture<SubscriberCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
