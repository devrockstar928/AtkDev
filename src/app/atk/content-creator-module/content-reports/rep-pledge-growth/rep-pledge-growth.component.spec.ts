import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PledgeGrowthComponent } from './pledge-growth.component';

describe('PledgeGrowthComponent', () => {
  let component: PledgeGrowthComponent;
  let fixture: ComponentFixture<PledgeGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PledgeGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PledgeGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
