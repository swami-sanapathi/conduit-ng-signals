import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus, Article } from '../../../shared/models';
import { NewArticle } from '../../../shared/models/new-article';
import { processError } from '../../../utils/common-fns/error_handlers';
import { injectDestroy } from '../../../utils/destory-notifier';

@Injectable()
export class EditArticleService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private destroy = injectDestroy();
    state = signal<ApiStatus>('idle');
    errors = signal<string[]>([]);
    article = signal<Article | null>(null);

    publishArticle(article: NewArticle, type: 'new' | 'update') {
        this.state.set('loading');

        if (type === 'new') {
            this.createArticle(article);
        } else {
            this.updateArticle(article);
        }
    }

    private createArticle(article: NewArticle) {
        this.http
            .post<{ article: Article }>('/articles', { article })
            .pipe(
                takeUntil(this.destroy),
                catchError(() => {
                    this.state.set('error');
                    return EMPTY;
                })
            )
            .subscribe({
                next: ({ article }) => {
                    this.state.set('success');
                    this.router.navigate(['/article', article.slug]);
                },
                error: (err) => {
                    this.state.set('error');
                    const processedErrors = processError(err.error);
                    this.errors.set(processedErrors);
                }
            });
    }

    private updateArticle(article: NewArticle) {
        const slug = this.article()?.slug;
        this.http
            .put<{ article: Article }>(`/articles/${slug}`, { article })
            .pipe(
                takeUntil(this.destroy),
                catchError(() => {
                    this.state.set('error');
                    return EMPTY;
                })
            )
            .subscribe({
                next: ({ article }) => {
                    this.state.set('success');
                    this.router.navigate(['/article', article.slug]);
                },
                error: (err) => {
                    this.state.set('error');
                    const processedErrors = processError(err.error);
                    this.errors.set(processedErrors);
                }
            });
    }

    getArticle(slug: string) {
        this.state.set('loading');
        this.http
            .get<{ article: Article }>(`/articles/${slug}`)
            .pipe(
                takeUntil(this.destroy),
                catchError(() => {
                    this.state.set('error');
                    return EMPTY;
                })
            )
            .subscribe({
                next: ({ article }) => {
                    this.state.set('success');
                    this.article.set(article);
                },
                error: (err) => {
                    this.state.set('error');
                    const processedErrors = processError(err.error);
                    this.errors.set(processedErrors);
                }
            });
    }
}
