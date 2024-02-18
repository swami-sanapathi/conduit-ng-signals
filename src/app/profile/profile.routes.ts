import { Routes } from '@angular/router';
import { provideProfileToggle } from './profile.toggle.di';

export default [
    {
        path: '',
        loadComponent: () => import('../profile/profile.component'),
        children: [
            {
                path: '',
                providers: [provideProfileToggle('my')],
                loadComponent: () => import('../profile/profile-articles/profile-articles.component')
            },
            {
                path: 'favorites',
                providers: [provideProfileToggle('favorited')],
                loadComponent: () => import('../profile/profile-articles/profile-articles.component')
            }
        ]
    }
] as Routes;
