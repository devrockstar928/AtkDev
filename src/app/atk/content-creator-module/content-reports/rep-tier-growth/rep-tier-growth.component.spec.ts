import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepTierGrowthComponent } from './rep-tier-growth.component';

describe('RepTierGrowthComponent', () => {
  let component: RepTierGrowthComponent;
  let fixture: ComponentFixture<RepTierGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepTierGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepTierGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
