import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { SignupInfo } from '../models';
import { SignupResponse } from '../models/Author';
import { State } from '../models/State';
import { AuthService } from '../shared/services/auth.service';
import { SessionStorageService } from '../shared/services/local_storage';
import { processError } from '../utils/common-fns/error_handlers';
@Injectable()
export class RegisterService {
    state = signal<State>('loaded');
    private http = inject(HttpClient);
    private sessionStorage = inject(SessionStorageService);
    private authService = inject(AuthService);
    public errors = signal<Array<string>>([]);

    registerUser(user: SignupInfo) {
        this.state.set('loading');
        return this.http.post<{ user: SignupResponse }>('/users', { user }).subscribe({
            next: ({ user }) => {
                this.sessionStorage.setItem('token', user.token);
                this.sessionStorage.setItem('email', user.email);
                this.sessionStorage.setItem('username', user.username);
                this.sessionStorage.setItem('bio', user.bio);
                this.sessionStorage.setItem('image', user.image);
                this.state.set('loaded');
                this.authService.isAuthenticated.set(true);
            },
            error: (error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        });
    }
}
