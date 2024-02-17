import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiStatus } from '../shared/models';
import { UserResponse } from '../shared/models/author';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService } from '../shared/services/local_storage';
import { Error, processError } from '../utils/common-fns/error_handlers';

@Injectable()
export class LoginService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private authService = inject(AuthService);
    private storage = inject(LocalStorageService);
    private state = signal<ApiStatus>('idle');
    _state = this.state.asReadonly();
    private errors = signal<string[]>([]);
    _errors = this.errors.asReadonly();

    login(user: { username: string; password: string }) {
        this.state.set('loading');
        this.http.post<{ user: UserResponse }>('/users/login', { user }).subscribe(
            ({ user }) => {
                this.authService.authenticate(user);
                this.state.set('success');
            },
            (error: Error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        );
    }
}
