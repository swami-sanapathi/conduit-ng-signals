import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Article } from '../models/Articles';
import { injectDestroy } from '../utils/destory-notifier';

type State = 'loading' | 'loaded' | 'error';
@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
    private destroy = injectDestroy();

    articles = signal<Article[]>([]);
    state = signal<State>('loading');
    getArticles() {
        this.http
            .get<{ articles: Article[]; articlesCount: number }>('/articles')
            .pipe(this.destroy())
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
