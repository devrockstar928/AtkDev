import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHistoryComponent } from './sub-history.component';

describe('SubHistoryComponent', () => {
  let component: SubHistoryComponent;
  let fixture: ComponentFixture<SubHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
