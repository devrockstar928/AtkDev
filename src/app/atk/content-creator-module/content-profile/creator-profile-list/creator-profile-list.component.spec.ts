import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorProfileListComponent } from './creator-profile-list.component';

describe('CreatorProfileListComponent', () => {
  let component: CreatorProfileListComponent;
  let fixture: ComponentFixture<CreatorProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
