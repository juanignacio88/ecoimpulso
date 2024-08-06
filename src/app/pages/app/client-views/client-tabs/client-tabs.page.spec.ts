import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientTabsPage } from './client-tabs.page';

describe('ClientTabsPage', () => {
  let component: ClientTabsPage;
  let fixture: ComponentFixture<ClientTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
