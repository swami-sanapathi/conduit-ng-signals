import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { SignupInfo } from '../shared/models';
import { ApiStatus } from '../shared/models/api-status';
import { SignupResponse } from '../shared/models/author';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService } from '../shared/services/local_storage';
import { processError } from '../utils/common-fns/error_handlers';
@Injectable()
export class RegisterService {
    state = signal<ApiStatus>('success');
    private http = inject(HttpClient);
    private storage = inject(LocalStorageService);
    private authService = inject(AuthService);
    public errors = signal<Array<string>>([]);

    registerUser(user: SignupInfo) {
        this.state.set('loading');
        return this.http.post<{ user: SignupResponse }>('/users', { user }).subscribe({
            next: ({ user }) => {
                this.authService.authenticate(user);
                this.state.set('success');
            },
            error: (error) => {
                this.state.set('error');
                this.errors.set(processError(error));
            }
        });
    }
}
