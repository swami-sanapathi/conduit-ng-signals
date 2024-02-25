import { Component, EventEmitter, Output, input } from '@angular/core';
import { UserProfile } from '../../shared/models';

@Component({
    selector: 'app-user-info',
    standalone: true,
    template: ` <div class="user-info">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <img alt="{{ user().username }}" [src]="user().image" class="user-img" />
                    <h4>{{ user().username }}</h4>
                    <p>
                        {{ user().bio }}
                    </p>

                    @if (!isOwner()) {
                        <a class="btn btn-sm btn-outline-secondary action-btn" (click)="followToggle.emit()">
                            <i class="ion-plus-round"></i>
                            &nbsp; {{ user().following ? 'Unfollow' : 'Follow' }}
                            {{ user().username }}
                        </a>
                    } @else {
                        <a class="btn btn-sm btn-outline-secondary action-btn" routerLink="/settings">
                            <i class="ion-gear-a"></i>
                            &nbsp; Edit Profile Settings
                        </a>
                    }
                </div>
            </div>
        </div>
    </div>`
})
export class UserInfoComponent {
    user = input.required<UserProfile>();
    isOwner = input.required<boolean>();
    @Output() followToggle = new EventEmitter<void>();
}
