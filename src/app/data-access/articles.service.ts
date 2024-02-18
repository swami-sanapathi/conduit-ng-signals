import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus, Article } from '../shared/models';
import { injectDestroy } from '../utils/destory-notifier';

type FeedType = 'global' | 'user' | 'tag';

@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
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
        const params = type === 'tag' ? new HttpParams().set('tag', tag || '') : undefined;

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

    getArticlesByTag(tag: string) {
        this.destroy.next();
        this.http
            .get<{ articles: Article[] }>('/articles', {
                params: {
                    tag
                }
            })
            .pipe(takeUntil(this.destroy))
            .subscribe({
                next: ({ articles }) => {
                    this.articles.set(articles);
                    this.state.set('success');
                },
                error: () => {
                    this.state.set('error');
                }
            });
    }
}
