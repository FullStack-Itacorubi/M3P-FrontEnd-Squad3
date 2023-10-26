import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentModalComponent } from './medicament-modal.component';

describe('MedicamentModalComponent', () => {
  let component: MedicamentModalComponent;
  let fixture: ComponentFixture<MedicamentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicamentModalComponent]
    });
    fixture = TestBed.createComponent(MedicamentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
