import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientTab3Page } from './client-tab3.page';

describe('ClientTab3Page', () => {
  let component: ClientTab3Page;
  let fixture: ComponentFixture<ClientTab3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
