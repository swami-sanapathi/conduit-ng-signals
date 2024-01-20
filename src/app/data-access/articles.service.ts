import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { Article } from '../models/Articles';
import { injectDestroy } from '../utils/destory-notifier';

type State = 'loading' | 'loaded' | 'error';
@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
    private destroy = injectDestroy();

    articles = signal<Article[]>([]);
    state = signal<State>('loading');
    getArticles(selectedTag?: string) {
        const url = selectedTag ? `/articles?tag=${selectedTag}` : '/articles';
        this.http
            .get<{ articles: Article[]; articlesCount: number }>(url)
            .pipe(
                switchMap((articles) => {
                    return of(articles);
                }),
                this.destroy()
            )
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
