import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ApiStatus } from '../shared/models';
import { UserResponse } from '../shared/models/author';
import { AuthService } from '../shared/services/auth.service';
import { Error, processError } from '../utils/common-fns/error_handlers';

@Injectable()
export class LoginService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private state = signal<ApiStatus>('idle');
    private errors = signal<string[]>([]);

    public _state = this.state.asReadonly();
    public _errors = this.errors.asReadonly();

    login(user: { username: string; password: string }) {
        this.state.set('loading');
        this.http.post<{ user: UserResponse }>('/users/login', { user }).subscribe({
            next: ({ user }) => {
                this.authService.authenticate(user);
                this.state.set('success');
            },
            error: (error: Error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        });
    }
}
