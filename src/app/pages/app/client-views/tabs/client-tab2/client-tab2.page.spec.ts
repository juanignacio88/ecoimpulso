import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientTab2Page } from './client-tab2.page';

describe('ClientTab2Page', () => {
  let component: ClientTab2Page;
  let fixture: ComponentFixture<ClientTab2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
