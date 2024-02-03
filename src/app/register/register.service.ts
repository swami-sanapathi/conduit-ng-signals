import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { SignupInfo } from '../models';
import { State } from '../models/State';
import { processError } from '../utils/common-fns/error_handlers';
@Injectable()
export class RegisterService {
    state = signal<State>('loaded');
    private http = inject(HttpClient);
    public errors = signal<Array<string>>([]);

    registerUser(user: SignupInfo) {
        this.state.set('loading');
        return this.http.post('/users', user).subscribe({
            next: () => {
                this.state.set('loaded');
            },
            error: (error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        });
    }
}
