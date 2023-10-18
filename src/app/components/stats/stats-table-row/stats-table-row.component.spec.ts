import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTableRowComponent } from './stats-table-row.component';

describe('StatsTableRowComponent', () => {
  let component: StatsTableRowComponent;
  let fixture: ComponentFixture<StatsTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsTableRowComponent]
    });
    fixture = TestBed.createComponent(StatsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
