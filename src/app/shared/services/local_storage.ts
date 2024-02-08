import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE } from '../../tokens/local_storage_token';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    private sessionStorage = inject(LOCAL_STORAGE);

    setItem(key: string, value: string): void {
        this.sessionStorage?.setItem(key, value);
    }

    getItem(key: string) {
        try {
            const user = this.sessionStorage?.getItem(key);
            if (user) return JSON.parse(user);
        } catch (error) {
            return {};
        }
    }

    clear(): void {
        this.sessionStorage?.clear();
    }
}
