import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedContentComponent } from './posted-content.component';

describe('PostedContentComponent', () => {
  let component: PostedContentComponent;
  let fixture: ComponentFixture<PostedContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostedContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
