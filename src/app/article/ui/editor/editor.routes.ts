import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('../editor/new-article/new-article.component')
    },
    {
        path: ':slug',
        loadComponent: () => import('../editor/edit-article/edit-article.component')
    }
] as Routes;
