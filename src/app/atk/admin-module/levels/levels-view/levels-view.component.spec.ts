import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsViewComponent } from './levels-view.component';

describe('LevelsViewComponent', () => {
  let component: LevelsViewComponent;
  let fixture: ComponentFixture<LevelsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
