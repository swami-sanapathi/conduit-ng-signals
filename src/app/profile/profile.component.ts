import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileArticleToggleComponent } from './profile-article-toggle/profile-article-toggle.component';
import { ProfileService } from './profile.service';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
        <div class="block profile-page">
            @if (profileService.status() === 'success') {
                @if (profileService.user(); as user) {
                    <app-user-info
                        [user]="user"
                        [isOwner]="profileService.isOwner()"
                        (followToggle)="profileService.updateFollowStatus(user)"
                    />
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-md-10 offset-md-1">
                                <app-profile-article-toggle [username]="user?.username" />
                                <router-outlet />
                            </div>
                        </div>
                    </div>
                }
            } @else {
                <ng-container>Loading profile...</ng-container>
            }
        </div>
    `,
    providers: [ProfileService],
    imports: [RouterOutlet, ProfileArticleToggleComponent, RouterLink, UserInfoComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProfileComponent {
    profileService = inject(ProfileService);
    username = input.required<string>();

    constructor() {
        effect(
            () => {
                this.profileService.getProfileByUsername(this.username());
            },
            { allowSignalWrites: true }
        );
    }
}
