import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserXpComponent } from './user-xp.component';

describe('UserXpComponent', () => {
  let component: UserXpComponent;
  let fixture: ComponentFixture<UserXpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserXpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
