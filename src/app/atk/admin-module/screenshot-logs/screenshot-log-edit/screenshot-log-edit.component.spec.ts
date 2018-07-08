import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotLogEditComponent } from './screenshot-log-edit.component';

describe('ScreenshotLogEditComponent', () => {
  let component: ScreenshotLogEditComponent;
  let fixture: ComponentFixture<ScreenshotLogEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenshotLogEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotLogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
