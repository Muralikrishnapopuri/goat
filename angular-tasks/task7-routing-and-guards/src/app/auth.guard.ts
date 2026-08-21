import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Angular CanActivateFn Guard (React equivalent: <ProtectedRoute> wrapper)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Access granted
  }

  // Redirect to unauthorized page
  return router.createUrlTree(['/unauthorized']);
};
