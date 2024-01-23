import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Article, State } from '../models';
import { injectDestroy } from '../utils/destory-notifier';

@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
    private destroy = injectDestroy();
    $selectedTag = new Subject<string>();

    articles = signal<Article[]>([]);
    state = signal<State>('loading');
    getArticles() {
        this.http
            .get<{ articles: Article[]; articlesCount: number }>('/articles')
            .pipe(takeUntil(this.destroy))
            .subscribe({
                next: ({ articles }) => {
                    this.articles.set(articles);
                    this.state.set('loaded');
                },
                error: () => {
                    this.state.set('error');
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
                    this.state.set('loaded');
                },
                error: () => {
                    this.state.set('error');
                }
            });
    }
}
