import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsTableRowComponent } from './logs-table-row.component';

describe('LogsTableRowComponent', () => {
  let component: LogsTableRowComponent;
  let fixture: ComponentFixture<LogsTableRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsTableRowComponent]
    });
    fixture = TestBed.createComponent(LogsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
