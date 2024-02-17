import { Routes } from '@angular/router';

export default [
    {
        path: '',
        title: 'Home',
        loadComponent: () => import('./layout/layout.component'),
        loadChildren: () => import('./layout/layout.routes')
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
] as Routes;
