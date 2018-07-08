import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAcitonsComponent } from './component-acitons.component';

describe('ComponentAcitonsComponent', () => {
  let component: ComponentAcitonsComponent;
  let fixture: ComponentFixture<ComponentAcitonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentAcitonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAcitonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
