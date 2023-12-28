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
    }
] as Routes;
