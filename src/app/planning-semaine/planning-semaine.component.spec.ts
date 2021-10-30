import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningSemaineComponent } from './planning-semaine.component';

describe('PlanningSemaineComponent', () => {
  let component: PlanningSemaineComponent;
  let fixture: ComponentFixture<PlanningSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningSemaineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
