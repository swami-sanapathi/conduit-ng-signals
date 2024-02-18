import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { UserResponse } from '../shared/models';
import { AuthService } from '../shared/services/auth.service';

@Injectable()
export class ProfileService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    user = signal<UserResponse | null>(null);
    isOwner = computed(() => {
        const user = this.user();
        return user && user.username === this.authService._user()?.username;
    });

    getProfileByUsername(username: string) {
        this.http.get<{ profile: UserResponse }>(`/profiles/${username}`).subscribe(({ profile }) => {
            this.user.set(profile);
        });
    }
}
