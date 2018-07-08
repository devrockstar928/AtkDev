import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundSummaryComponent } from './refund-summary.component';

describe('RefundSummaryComponent', () => {
  let component: RefundSummaryComponent;
  let fixture: ComponentFixture<RefundSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
