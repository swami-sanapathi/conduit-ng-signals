import { Injectable, inject } from '@angular/core';
import { LOCAL_STORAGE } from '../../providers/local-storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private localStorage = inject(LOCAL_STORAGE);

    setItem(key: string, value: string): void {
        this.localStorage?.setItem(key, value);
    }

    getItem(key: string) {
        const data = this.localStorage?.getItem(key);
        try {
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            return data;
        }
    }

    clear(): void {
        this.localStorage?.clear();
    }
}
