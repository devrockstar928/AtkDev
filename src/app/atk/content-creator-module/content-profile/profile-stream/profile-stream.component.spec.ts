import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStreamComponent } from './profile-stream.component';

describe('ProfileStreamComponent', () => {
  let component: ProfileStreamComponent;
  let fixture: ComponentFixture<ProfileStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
