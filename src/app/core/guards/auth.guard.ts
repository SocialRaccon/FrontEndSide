// src/app/core/guards/auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUserValue;
  if (currentUser?.token) {
    // Verificar roles si es necesario
    return true;
  }
  /*
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });*/
  return false;
};
