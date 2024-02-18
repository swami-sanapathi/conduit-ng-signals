import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const nonAuthGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    return !authService._isAuthenticated();
};
