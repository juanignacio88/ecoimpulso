import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clientUserGuard } from './client-user.guard';

describe('clientUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
