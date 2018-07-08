import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuViewComponent } from './sku-view.component';

describe('SkuViewComponent', () => {
  let component: SkuViewComponent;
  let fixture: ComponentFixture<SkuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
