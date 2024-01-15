import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { URL_TOKEN } from '../../tokens/api-url';

export function provideApiPrefix(): HttpInterceptorFn {
    return (req, next) => {
        if (!req.url.startsWith('http')) {
            const apiPrefix = inject(URL_TOKEN).url;
            const reqClone = req.clone({ url: `${apiPrefix}${req.url}` });
            return next(reqClone);
        }
        return next(req);
    };
}
