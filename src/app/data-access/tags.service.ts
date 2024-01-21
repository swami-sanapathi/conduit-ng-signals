import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { injectDestroy } from '../utils/destory-notifier';

@Injectable()
export class TagsService {
    private http = inject(HttpClient);
    private readonly destroy = injectDestroy();
    tags = signal<string[]>([]);

    getTags() {
        this.http
            .get<{ tags: string[] }>('/tags')
            .pipe(takeUntil(this.destroy))
            .subscribe(({ tags }) => {
                this.tags.set(tags);
            });
    }
}
