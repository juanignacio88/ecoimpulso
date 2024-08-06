import { CanActivateFn } from '@angular/router';

export const clientUserGuard: CanActivateFn = (route, state) => {
  return true;
};
