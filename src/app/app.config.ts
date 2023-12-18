import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [
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
        ])
    ]
};
