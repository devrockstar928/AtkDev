import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepAvgRevenueComponent } from './rep-avg-revenue.component';

describe('RepAvgRevenueComponent', () => {
  let component: RepAvgRevenueComponent;
  let fixture: ComponentFixture<RepAvgRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepAvgRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepAvgRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
