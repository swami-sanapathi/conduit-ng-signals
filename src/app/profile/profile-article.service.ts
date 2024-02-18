import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { ApiStatus, Article } from '../shared/models';
import { ProfileService } from './profile.service';
import { PROFILE_TOGGLE_TYPE } from './profile.toggle.di';

@Injectable()
export class ProfileArticleService {
    articles = signal<Article[]>([]);
    state = signal<ApiStatus>('idle');

    private http = inject(HttpClient);
    private profileService = inject(ProfileService);
    private toggle = inject(PROFILE_TOGGLE_TYPE);

    getArticles() {
        const user = this.profileService.user();
        if (user) {
            this.state.set('loading');
            this.http
                .get<{ articlesCount: number; articles: Article[] }>('/articles', {
                    params: this.toggle === 'my' ? { author: user.username } : { favorited: user.username }
                })
                .pipe(
                    catchError(() => {
                        this.state.set('error');
                        return EMPTY;
                    })
                )
                .subscribe(({ articles }) => {
                    this.state.set('error');
                    this.articles.set(articles);
                });
        }
    }
}
