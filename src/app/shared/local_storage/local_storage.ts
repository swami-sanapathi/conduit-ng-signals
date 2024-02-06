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
        return this.sessionStorage?.getItem(key);
    }

    clear(): void {
        this.sessionStorage?.clear();
    }
}
