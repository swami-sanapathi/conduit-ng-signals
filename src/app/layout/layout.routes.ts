import { Routes } from '@angular/router';
import { authGuard } from '../shared/guards/auth.guard';
import { nonAuthGuard } from '../shared/guards/non-auth.guard';

export default [
    {
        path: '',
        loadComponent: () => import('../home/home.component')
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('../login/login.component'),
        canMatch: [nonAuthGuard]
    },
    {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('../register/register.component'),
        canMatch: [nonAuthGuard]
    },
    {
        path: 'profile/:username',
        title: 'Profile',
        loadChildren: () => import('../profile/profile.routes'),
        canMatch: [authGuard]
    },
    {
        path: 'editor',
        title: 'Editor',
        loadChildren: () => import('../article/ui/editor/editor.routes'),
        canMatch: [authGuard]
    },
    {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('../settings/settings.component'),
        canMatch: [authGuard]
    },
    {
        path: 'article/:slug',
        title: 'Article',
        loadComponent: () => import('../article/ui/article-meta-data/article-meta-data.component'),
        canMatch: [authGuard]
    }
] as Routes;
