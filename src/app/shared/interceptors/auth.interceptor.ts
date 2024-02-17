import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local_storage';

export const provideAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const localStorageService = inject(LocalStorageService);
    const token = localStorageService.getItem('token');
    if (token) {
        const reqClone = req.clone({
            setHeaders: {
                Authorization: `Token ${token}`
            }
        });
        return next(reqClone);
    }
    return next(req);
};
