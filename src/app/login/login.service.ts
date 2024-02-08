import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../models';
import { UserResponse } from '../models/Author';
import { AuthService } from '../shared/services/auth.service';
import { SessionStorageService } from '../shared/services/local_storage';
import { Error, processError } from '../utils/common-fns/error_handlers';

@Injectable()
export class LoginService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private authService = inject(AuthService);
    private sessionStorage = inject(SessionStorageService);
    private state = signal<State>('loaded');
    private errors = signal<string[]>([]);
    _errors = this.errors.asReadonly();

    login(user: { username: string; password: string }) {
        this.state.set('loading');
        this.http.post<{ user: UserResponse }>('/users/login', { user }).subscribe(
            ({ user }) => {
                this.sessionStorage.setItem('user', JSON.stringify(user));
                this.sessionStorage.setItem('token', user.token);
                this.sessionStorage.setItem('email', user.email);
                this.sessionStorage.setItem('username', user.username);
                this.sessionStorage.setItem('bio', user.bio);
                this.sessionStorage.setItem('image', user.image);
                this.authService.isAuthenticated.set(true);
                this.authService.user.set(user);
                this.state.set('loaded');
                this.router.navigate(['/']);
            },
            (error: Error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        );
    }
}
