import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '../../models/Author';
import { SessionStorageService } from './local_storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storage = inject(SessionStorageService);
    private router = inject(Router);
    isAuthenticated = signal(false);
    user = signal<UserResponse | null>(null);
    readonly _isAuthenticated = computed(() => {
        return this.isAuthenticated() || !!this.storage.getItem('token') || false;
    });
    readonly _user = computed(() => {
        return Object.keys(this.user() || {}).length ? this.user() : this.storage.getItem('user');
    });

    logout() {
        this.storage.clear();
        this.isAuthenticated.set(false);
        this.user.set(null);
        this.router.navigate(['/']);
    }
}
