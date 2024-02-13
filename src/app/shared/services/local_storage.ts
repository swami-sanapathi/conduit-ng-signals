import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE } from '../../tokens/local_storage_token';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private localStorage = inject(LOCAL_STORAGE);

    setItem(key: string, value: string): void {
        this.localStorage?.setItem(key, value);
    }

    getItem(key: string) {
        try {
            const user = this.localStorage?.getItem(key);
            if (user) return JSON.parse(user);
        } catch (error) {
            return {};
        }
    }

    clear(): void {
        this.localStorage?.clear();
    }
}
