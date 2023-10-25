import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableHeaderComponent } from './user-table-header.component';

describe('UserTableHeaderComponent', () => {
  let component: UserTableHeaderComponent;
  let fixture: ComponentFixture<UserTableHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableHeaderComponent]
    });
    fixture = TestBed.createComponent(UserTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
