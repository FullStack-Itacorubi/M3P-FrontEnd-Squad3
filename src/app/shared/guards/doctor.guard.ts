import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const doctorGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isUserDoctor()) return true;
  return false;
};
