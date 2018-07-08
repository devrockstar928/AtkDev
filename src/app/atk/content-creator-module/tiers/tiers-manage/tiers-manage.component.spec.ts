import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiersManageComponent } from './tiers-manage.component';

describe('TiersManageComponent', () => {
  let component: TiersManageComponent;
  let fixture: ComponentFixture<TiersManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiersManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
