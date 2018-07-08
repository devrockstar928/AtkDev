import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepEngagementComponent } from './rep-engagement.component';

describe('RepEngagementComponent', () => {
  let component: RepEngagementComponent;
  let fixture: ComponentFixture<RepEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
