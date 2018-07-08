import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepSalesComponent } from './rep-sales.component';

describe('RepSalesComponent', () => {
  let component: RepSalesComponent;
  let fixture: ComponentFixture<RepSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
