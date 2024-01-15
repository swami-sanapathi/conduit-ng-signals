import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Article } from '../models/Articles';

type State = 'loading' | 'loaded' | 'error';
@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
    private destroyRef = inject(DestroyRef);

    articles = signal<Article[]>([]);
    state = signal<State>('loading');
    getArticles() {
        this.http
            .get<{ articles: Article[]; articlesCount: number }>('/articles')
            .pipe(takeUntilDestroyed(this.destroyRef))
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
