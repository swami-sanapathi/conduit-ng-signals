import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { SettingService } from './settings.service';

@Component({
    standalone: true,
    template: `
        <div class="settings-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Your Settings</h1>

                        <!-- <ul class="error-messages">
                            <li>That name is required</li>
                        </ul> -->

                        <form [formGroup]="profileForm" (ngSubmit)="settingService.updateUser(profileForm.value)">
                            <fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        formControlName="image"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        formControlName="username"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <textarea
                                        class="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Short bio about you"
                                        formControlName="bio"
                                    ></textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email"
                                        formControlName="email"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="password"
                                        placeholder="New Password"
                                        formControlName="password"
                                    />
                                </fieldset>
                                <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                        <hr />
                        <button class="btn btn-outline-danger" (click)="authService.logout()">
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [ReactiveFormsModule],
    providers: [SettingService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SettingsComponent {
    readonly authService = inject(AuthService);
    readonly settingService = inject(SettingService);
    profileForm = new FormGroup({
        image: new FormControl('', {
            nonNullable: true
        }),
        username: new FormControl('', {
            nonNullable: true
        }),
        bio: new FormControl('', {
            nonNullable: true
        }),
        email: new FormControl('', {
            nonNullable: true
        }),
        password: new FormControl('', {
            nonNullable: true
        })
    });
    constructor() {
        this.authService.getCurrentUser();
        this.profileForm.patchValue(this.authService._user());
    }
}
