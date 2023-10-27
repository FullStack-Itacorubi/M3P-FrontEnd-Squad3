import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietsSectionComponent } from './diets-section.component';

describe('DietsSectionComponent', () => {
  let component: DietsSectionComponent;
  let fixture: ComponentFixture<DietsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietsSectionComponent]
    });
    fixture = TestBed.createComponent(DietsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
