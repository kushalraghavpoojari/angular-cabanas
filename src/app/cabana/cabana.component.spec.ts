import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabanaComponent } from './cabana.component';

describe('CabanaComponent', () => {
  let component: CabanaComponent;
  let fixture: ComponentFixture<CabanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
