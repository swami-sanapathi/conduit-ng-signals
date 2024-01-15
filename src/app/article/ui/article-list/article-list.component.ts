import { Component, input } from '@angular/core';
import { Article } from '../../../models/Articles';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    selector: 'app-article-list',
    standalone: true,
    imports: [ArticlePreviewComponent],
    template: `
        @if (state() === 'loaded') {
            @for (article of articles(); track article.id) {
                <app-article-preview [article]="article"></app-article-preview>
            }
        } @else if (state() === 'loading') {
            <app-article-preview> Loading articles... </app-article-preview>
        } @else {
            <app-article-preview>No articles are here... yet. </app-article-preview>
        }
    `
})
export class ArticleListComponent {
    articles = input.required<Article[]>();
    state = input.required<string>();
}
