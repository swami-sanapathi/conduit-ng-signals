import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from '../shared/ui/error.component';
import { RegisterService } from './register.service';

@Component({
    standalone: true,
    template: `
        <div class="auth-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Sign up</h1>
                        <p class="text-xs-center">
                            <a routerLink="/login">Have an account?</a>
                        </p>
                        @defer (when registerService.errors().length) {
                            <app-error [errors]="registerService.errors()" />
                        }
                        <form [formGroup]="form">
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    formControlName="username"
                                    autocomplete="off"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                    formControlName="email"
                                    autocomplete="off"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    formControlName="password"
                                    autocomplete="off"
                                />
                            </fieldset>
                            <button
                                class="btn btn-lg btn-primary pull-xs-right"
                                type="submit"
                                [disabled]="registerService.state() === 'loading'"
                                (click)="submit()"
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    providers: [RegisterService],
    imports: [ReactiveFormsModule, ErrorComponent]
})
export default class RegisterComponent {
    form: FormGroup;
    registerService = inject(RegisterService);
    constructor(private fb: FormBuilder) {
        this.form = this.fb.nonNullable.group({
            username: '',
            email: '',
            password: ''
        });
    }

    submit() {
        this.registerService.registerUser(this.form.value);
        this.form.reset();
    }
}
