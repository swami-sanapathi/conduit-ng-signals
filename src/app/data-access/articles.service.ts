import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus, Article } from '../shared/models';
import { injectDestroy } from '../utils/destory-notifier';

type FeedType = 'global' | 'user';

@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private destroy = injectDestroy();

    articles = signal<Article[]>([]);
    state = signal<ApiStatus>('loading');
    feedType = signal('global');
    selectedTag = signal<string | null>(null);

    getArticles(type: FeedType = 'global', tag?: string) {
        this.destroy.next(); // cancel previous request
        this.feedType.set(type);
        this.state.set('loading');
        this.selectedTag.set(tag || null);

        const api = type === 'global' ? '/articles' : '/articles/feed';
        const params = tag ? new HttpParams().set('tag', tag || '') : undefined;

        this.http
            .get<{ articles: Article[]; articlesCount: number }>(api, {
                params
            })
            .pipe(
                takeUntil(this.destroy),
                catchError(() => {
                    this.state.set('error');
                    return EMPTY;
                })
            )
            .subscribe({
                next: ({ articles }) => {
                    this.articles.set(articles);
                    this.state.set('success');
                },
                error: () => {
                    this.state.set('error');
                    return EMPTY;
                }
            });
    }

    toggleFavorite(article: Article): void {
        this.destroy.next();
        const request = article.favorited
            ? this.http.delete(`/articles/${article.slug}/favorite`)
            : this.http.post(`/articles/${article.slug}/favorite`, null);

        request.pipe(takeUntil(this.destroy)).subscribe(() => {
            this.articles.update((articles) => {
                const index = articles.findIndex((a) => a.slug === article.slug);
                if (index !== -1) {
                    articles[index] = {
                        ...article,
                        favorited: !article.favorited,
                        favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1
                    };
                }
                return [...articles];
            });
        });
    }
}
