import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiStatus, UserProfile } from '../shared/models';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class ProfileService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    user = signal<UserProfile | null>(null);
    status = signal<ApiStatus>('loading');
    isOwner = computed(() => {
        const user = this.user();
        return user?.username === this.authService._user()?.username;
    });

    getProfileByUsername(username: string) {
        this.status.set('loading');
        this.http.get<{ profile: UserProfile }>(`/profiles/${username}`).subscribe(({ profile }) => {
            this.user.set(profile);
            this.status.set('success');
        });
    }

    updateFollowStatus(currentUser: UserProfile) {
        const { username, following } = currentUser;
        if (following) {
            this.http.delete<{ profile: UserProfile }>(`/profiles/${username}/follow`).subscribe(({ profile }) => {
                this.user.set(profile);
            });
        } else {
            this.http.post<{ profile: UserProfile }>(`/profiles/${username}/follow`, null).subscribe(({ profile }) => {
                this.user.set(profile);
            });
        }
    }
}
