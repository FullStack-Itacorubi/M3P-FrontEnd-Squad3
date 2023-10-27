import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesSectionComponent } from './queries-section.component';

describe('QueriesSectionComponent', () => {
  let component: QueriesSectionComponent;
  let fixture: ComponentFixture<QueriesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueriesSectionComponent]
    });
    fixture = TestBed.createComponent(QueriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
