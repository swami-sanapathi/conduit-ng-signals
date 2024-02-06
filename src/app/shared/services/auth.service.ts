import { Injectable, computed, inject, signal } from '@angular/core';
import { SessionStorageService } from './local_storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storage = inject(SessionStorageService);
    isAuthenticated = signal(false);
    _isAuthenticated = computed(() => {
        return this.isAuthenticated() || !!this.storage.getItem('token') || false;
    });
}
