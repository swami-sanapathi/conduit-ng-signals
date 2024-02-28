import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus } from '../shared/models';
import { injectDestroy } from '../utils/destory-notifier';

@Injectable()
export class TagsService {
    private http = inject(HttpClient);
    status = signal<ApiStatus>('loading');
    private readonly destroy = injectDestroy();
    tags = signal<string[]>([]);

    getTags() {
        this.status.set('loading');
        this.http
            .get<{ tags: string[] }>('/tags')
            .pipe(
                takeUntil(this.destroy),
                catchError(() => {
                    this.status.set('error');
                    return EMPTY;
                })
            )
            .subscribe(({ tags }) => {
                this.tags.set(tags);
                this.status.set('success');
            });
    }
}
