import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideNavLinkComponent } from './aside-nav-link.component';

describe('AsideNavLinkComponent', () => {
  let component: AsideNavLinkComponent;
  let fixture: ComponentFixture<AsideNavLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideNavLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
