import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { State } from '../models';
import { UserResponse } from '../models/Author';
import { Error, processError } from '../utils/common-fns/error_handlers';

@Injectable()
export class LoginService {
    private http = inject(HttpClient);
    private state = signal<State>('loaded');
    private errors = signal<string[]>([]);
    _errors = this.errors.asReadonly();

    login(user: { username: string; password: string }) {
        console.log(user);
        this.state.set('loading');
        this.http.post<{ user: UserResponse }>('/users/login', { user }).subscribe(
            ({ user }) => {
                this.state.set('loaded');
                localStorage.setItem('jwt', user.token);
                localStorage.setItem('username', user.username);
                localStorage.setItem('email', user.email);
                localStorage.setItem('bio', user.bio);
                localStorage.setItem('image', user.image);
            },
            (error: Error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        );
    }
}
