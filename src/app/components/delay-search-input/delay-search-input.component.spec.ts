import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelaySearchInputComponent } from './delay-search-input.component';

describe('DelaySearchInputComponent', () => {
  let component: DelaySearchInputComponent;
  let fixture: ComponentFixture<DelaySearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelaySearchInputComponent]
    });
    fixture = TestBed.createComponent(DelaySearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
