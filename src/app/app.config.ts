import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApiPrefix } from './shared/interceptors/api-prefix.interceptor';
import { provideApiUrl } from './tokens/api-url';

export const appConfig: ApplicationConfig = {
    providers: [
        provideApiUrl({ url: 'https://api.realworld.io/api' }),
        provideRouter([
            {
                path: '',
                loadComponent: () => import('./layout/layout.component'),
                loadChildren: () => import('./layout/layout.routes')
            },
            {
                path: '**',
                redirectTo: '/',
                pathMatch: 'full'
            }
        ]),
        provideHttpClient(withInterceptors([provideApiPrefix()]))
    ]
};
