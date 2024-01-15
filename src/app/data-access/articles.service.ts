import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Article } from '../models/article';

@Injectable()
export class ArticlesService {
    private http = inject(HttpClient);
    private destroyRef = inject(DestroyRef);

    articles = signal<Article[]>([]);
    getArticles() {
        // https://api.realworld.io/api/articles
        this.http
            .get<{ articles: Article[]; articlesCount: number }>('/articles')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.articles.set(response.articles);
            });
    }
}
