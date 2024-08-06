import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientTab1Page } from './client-tab1.page';

describe('ClientTab1Page', () => {
  let component: ClientTab1Page;
  let fixture: ComponentFixture<ClientTab1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
