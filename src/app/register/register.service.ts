import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { SignupInfo } from '../models';
import { State } from '../models/State';
type Error = {
    errors: {
        [key: string]: string[];
    };
};
@Injectable()
export class RegisterService {
    state = signal<State>('loaded');
    private http = inject(HttpClient);
    public errors = signal<Array<string>>([]);

    registerUser(user: SignupInfo) {
        this.state.set('loading');
        return this.http.post('/users', user).subscribe({
            next: (res) => {
                this.state.set('loaded');
                console.log('User registered successfully', res);
            },
            error: ({ error }: { error: Error }) => {
                // {"errors":{"email":["can't be blank"]}}
                this.state.set('error');
                console.log('Error registering user', error);
                this.processError(error);
                // TODO: Handle error and return error messages to user
            }
        });
    }

    processError(err: Error) {
        const entries = Object.entries(err.errors);
        console.log('Error registering user', err);
        const errors = entries.map((entry) => {
            const [key, value] = entry;
            return `${key} ${(value as string[])[0]}`;
        });
        this.errors.set(errors);
    }
}
