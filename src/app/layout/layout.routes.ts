import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('../home/home.component')
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('../login/login.component')
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('../register/register.component')
    },
    {
        path: 'profile/:username',
        title: 'Profile',
        loadComponent: () => import('../profile/profile.component')
        // canMatch: []
    },
    {
        path: 'editor',
        title: 'Editor',
        loadComponent: () => import('../article/ui/edit-article/edit-article.component'),
        canMatch: []
    },
    {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('../settings/settings.component'),
        canMatch: []
    }
] as Routes;
