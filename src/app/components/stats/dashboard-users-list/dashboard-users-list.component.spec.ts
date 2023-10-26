import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsersListComponent } from './dashboard-users-list.component';

describe('StatsListComponent', () => {
  let component: DashboardUsersListComponent;
  let fixture: ComponentFixture<DashboardUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardUsersListComponent],
    });
    fixture = TestBed.createComponent(DashboardUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
