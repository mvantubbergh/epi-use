import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleEmployeesComponent } from './responsible-employees.component';

describe('ResponsibleEmployeesComponent', () => {
  let component: ResponsibleEmployeesComponent;
  let fixture: ComponentFixture<ResponsibleEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsibleEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
