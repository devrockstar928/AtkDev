import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorOrdersComponent } from './creator-orders.component';

describe('CreatorOrdersComponent', () => {
  let component: CreatorOrdersComponent;
  let fixture: ComponentFixture<CreatorOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
