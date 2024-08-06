import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTab1Page } from './admin-tab1.page';

describe('AdminTab1Page', () => {
  let component: AdminTab1Page;
  let fixture: ComponentFixture<AdminTab1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
