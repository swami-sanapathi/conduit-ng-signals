import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { UserResponse } from '../shared/models';

@Injectable()
export class ProfileService {
    private http = inject(HttpClient);
    user = signal<UserResponse | null>(null);

    getProfileByUsername(username: string) {
        this.http.get<{ profile: UserResponse }>(`/profiles/${username}`).subscribe(({ profile }) => {
            this.user.set(profile);
        });
    }
}
