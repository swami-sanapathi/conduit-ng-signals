import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService._isAuthenticated() ?? router.createUrlTree(['/']);
};
