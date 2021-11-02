import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningFilterComponent } from './planning-filter.component';

describe('PlanningFilterComponent', () => {
  let component: PlanningFilterComponent;
  let fixture: ComponentFixture<PlanningFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
