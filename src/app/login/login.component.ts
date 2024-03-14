import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorComponent } from '../shared/ui/error.component';
import { LoginService } from './login.service';

@Component({
    standalone: true,
    template: `
        <div class="auth-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Sign in</h1>
                        <p class="text-xs-center">
                            <a routerLink="/register">Need an account?</a>
                        </p>

                        @defer (when loginService._errors().length) {
                            <app-error [errors]="loginService._errors()" />
                        }

                        <form [formGroup]="loginForm">
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                    autocomplete="off"
                                    autofocus
                                    formControlName="email"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    autocomplete="off"
                                    formControlName="password"
                                />
                            </fieldset>
                            <button
                                class="btn btn-lg btn-primary pull-xs-right"
                                [disabled]="loginForm.invalid || loginService._state() === 'loading'"
                                (click)="loginService.login(loginForm.value)"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [ErrorComponent, ReactiveFormsModule],
    providers: [LoginService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {
    loginService = inject(LoginService);
    loginForm: FormGroup;
    private fb = inject(FormBuilder);
    constructor() {
        this.loginForm = this.fb.nonNullable.group({
            email: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.email] }),
            password: this.fb.nonNullable.control('', Validators.required)
        });
    }
}
