import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalRegisterComponent } from './internal-register.component';

describe('InternalRegisterComponent', () => {
  let component: InternalRegisterComponent;
  let fixture: ComponentFixture<InternalRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
