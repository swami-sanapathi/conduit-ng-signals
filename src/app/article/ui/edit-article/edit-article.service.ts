import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus, Article } from '../../../shared/models';
import { NewArticle } from '../../../shared/models/new-article';
import { processError } from '../../../utils/common-fns/error_handlers';
import { injectDestroy } from '../../../utils/destory-notifier';

@Injectable()
export class EditArticleService {
    private http = inject(HttpClient);
    private destroy = injectDestroy();
    state = signal<ApiStatus>('idle');
    errors = signal<string[]>([]);
    article = signal<Article | null>(null);

    publishArticle(article: NewArticle) {
        this.state.set('loading');
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
                    // TODO: navigate to article page
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
