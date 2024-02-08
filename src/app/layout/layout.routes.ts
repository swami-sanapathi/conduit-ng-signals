import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('../home/home.component')
    },
    {
        path: 'login',
        loadComponent: () => import('../login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('../register/register.component')
    },
    {
        path: 'profile/:username',
        loadComponent: () => import('../profile/profile.component'),
        canMatch: []
    },
    {
        path: 'settings',
        loadComponent: () => import('../settings/settings.component'),
        canMatch: []
    }
] as Routes;
