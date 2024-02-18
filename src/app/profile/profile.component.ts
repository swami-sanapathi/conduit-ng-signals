import { Component, OnInit, inject, input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileArticleToggleComponent } from './profile-article-toggle/profile-article-toggle.component';
import { ProfileService } from './profile.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    template: `
        <div class="profile-page">
            <div class="user-info">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10 offset-md-1">
                            <img
                                alt="{{ profileService.user()?.username }}"
                                [src]="profileService.user()?.image"
                                class="user-img"
                            />
                            <h4>{{ profileService.user()?.username }}</h4>
                            <p>
                                {{ profileService.user()?.bio }}
                            </p>

                            @if (!profileService.isOwner()) {
                                <a class="btn btn-sm btn-outline-secondary action-btn">
                                    <i class="ion-plus-round"></i>
                                    &nbsp; {{ profileService.user()?.following ? 'Unfollow' : 'Follow' }}
                                    {{ profileService.user()?.username }}
                                </a>
                            }

                            @if (profileService.isOwner()) {
                                <a class="btn btn-sm btn-outline-secondary action-btn" routerLink="/settings">
                                    <i class="ion-gear-a"></i>
                                    &nbsp; Edit Profile Settings
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <app-profile-article-toggle [username]="profileService.user()?.username" />
                        <router-outlet />
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [RouterOutlet, ProfileArticleToggleComponent, RouterLink],
    providers: [ProfileService]
})
export default class ProfileComponent implements OnInit {
    profileService = inject(ProfileService);
    username = input.required<string>();

    ngOnInit(): void {
        this.profileService.getProfileByUsername(this.username());
    }
}
