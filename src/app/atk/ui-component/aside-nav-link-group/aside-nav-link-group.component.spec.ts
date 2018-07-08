import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideNavLinkGroupComponent } from './aside-nav-link-group.component';

describe('AsideNavLinkGroupComponent', () => {
  let component: AsideNavLinkGroupComponent;
  let fixture: ComponentFixture<AsideNavLinkGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideNavLinkGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideNavLinkGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
