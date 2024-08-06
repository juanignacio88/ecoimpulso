import { CanActivateFn } from '@angular/router';

export const adminUserGuard: CanActivateFn = (route, state) => {
  return true;
};
