import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorFeedComponent } from './creator-feed.component';

describe('CreatorFeedComponent', () => {
  let component: CreatorFeedComponent;
  let fixture: ComponentFixture<CreatorFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
