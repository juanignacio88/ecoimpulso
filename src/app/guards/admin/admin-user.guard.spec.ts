import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminUserGuard } from './admin-user.guard';

describe('adminUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
