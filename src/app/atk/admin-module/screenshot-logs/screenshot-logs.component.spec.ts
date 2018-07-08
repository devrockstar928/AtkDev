import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotLogsComponent } from './screenshot-logs.component';

describe('ScreenshotLogsComponent', () => {
  let component: ScreenshotLogsComponent;
  let fixture: ComponentFixture<ScreenshotLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenshotLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenshotLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
