import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { ApiStatus } from '../shared/models';
import { UserResponse } from '../shared/models/author';
import { AuthService } from '../shared/services/auth.service';

export type updateUser = {
    name?: string;
    email?: string;
    password?: string;
    bio?: string;
    image?: string;
};
@Injectable()
export class SettingService {
    private http = inject(HttpClient);
    private status = signal<ApiStatus>('idle');
    private authService = inject(AuthService);
    isLoading = computed(() => this.status() === 'loading');
    updateUser(user: updateUser) {
        this.status.set('loading');
        return this.http
            .put<{ user: UserResponse }>('/user', { user })
            .pipe(
                catchError(() => {
                    this.status.set('error');
                    return EMPTY;
                })
            )
            .subscribe(({ user }) => {
                this.authService.authenticate(user, ['/profile', user.username]);
                this.status.set('success');
            });
    }
}
