import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '../models';
import { LocalStorageService } from './local_storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storage = inject(LocalStorageService);
    private router = inject(Router);
    private http = inject(HttpClient);
    private isAuthenticated = signal(false);
    user = signal<UserResponse | null>(null);

    readonly _isAuthenticated = computed(() => {
        return this.isAuthenticated() || !!this.storage.getItem('token') || false;
    });
    readonly _user = computed(() => {
        return this.user() ? this.user() : this.storage.getItem('user');
    });

    authenticate(user: UserResponse, urlSegments: string[] = ['/']): void {
        this.storage.setItem('token', user.token);
        this.storage.setItem('user', JSON.stringify(user));
        this.user.set(user);
        this.isAuthenticated.set(true);
        this.router.navigate(urlSegments);
    }

    logout() {
        this.storage.clear();
        this.user.set(null);
        this.isAuthenticated.set(false);
        this.router.navigate(['/']);
    }

    getCurrentUser() {
        return this.http.get<{ user: UserResponse }>('/user').subscribe(({ user }) => {
            this.user.set(user);
        });
    }
}
