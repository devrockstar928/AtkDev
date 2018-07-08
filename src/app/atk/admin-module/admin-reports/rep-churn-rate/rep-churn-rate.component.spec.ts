import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepChurnRateComponent } from './rep-churn-rate.component';

describe('RepChurnRateComponent', () => {
  let component: RepChurnRateComponent;
  let fixture: ComponentFixture<RepChurnRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepChurnRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepChurnRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
