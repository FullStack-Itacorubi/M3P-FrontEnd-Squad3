import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const connectionGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isUserAuthenticated())
    inject(Router).navigate(['login']);
  return true;
};
