import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberStreamComponent } from './subscriber-stream.component';

describe('SubscriberStreamComponent', () => {
  let component: SubscriberStreamComponent;
  let fixture: ComponentFixture<SubscriberStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriberStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
