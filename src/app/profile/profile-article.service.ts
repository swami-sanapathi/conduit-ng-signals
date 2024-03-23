import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus, Article } from '../shared/models';
import { injectDestroy } from '../utils/destory-notifier';
import { ProfileService } from './profile.service';
import { PROFILE_TOGGLE_TYPE } from './profile.toggle.di';

@Injectable()
export class ProfileArticleService {
    articles = signal<Article[]>([]);
    state = signal<ApiStatus>('loading');
    private destroy = injectDestroy();

    private http = inject(HttpClient);
    private profileService = inject(ProfileService);
    toggleType = inject(PROFILE_TOGGLE_TYPE);

    constructor() {
        effect(
            () => {
                const user = this.profileService.user();
                if (user) {
                    this.getArticles(user.username);
                }
            },
            { allowSignalWrites: true }
        );
    }

    getArticles(username: string) {
        this.state.set('loading');
        this.http
            .get<{ articlesCount: number; articles: Article[] }>('/articles', {
                params: this.toggleType === 'my' ? { author: username } : { favorited: username }
            })
            .pipe(
                takeUntil(this.destroy),
                catchError(() => {
                    this.state.set('error');
                    return EMPTY;
                })
            )
            .subscribe(({ articles }) => {
                this.state.set('success');
                this.articles.set(articles);
            });
    }

    toggleFavorite(article: Article) {
        const { slug, favorited } = article;
        if (!favorited) {
            this.http.post(`/articles/${slug}/favorite`, null).subscribe(() => {
                const newArticles = this.articles().map((a) =>
                    a.slug === slug ? { ...a, favorited: !favorited, favoritesCount: a.favoritesCount + 1 } : a
                );
                this.articles.set(newArticles);
            });
        } else {
            this.http.delete(`/articles/${slug}/favorite`).subscribe(() => {
                const newArticles = this.articles().map((a) =>
                    a.slug === slug ? { ...a, favorited: !favorited, favoritesCount: a.favoritesCount - 1 } : a
                );
                this.articles.set(newArticles);
            });
        }
    }
}
