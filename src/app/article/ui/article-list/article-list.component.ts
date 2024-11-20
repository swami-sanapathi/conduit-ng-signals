import { Component, input, output } from '@angular/core';
import { Article } from '../../../shared/models/articles';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    selector: 'app-article-list',
    imports: [ArticlePreviewComponent],
    template: `
        @if (state() === 'success') {
            @for (article of articles(); track article.id) {
                <app-article-preview [article]="article" (toggleFavorite)="toggleFavorite.emit($event)" />
            } @empty {
                <app-article-preview>No articles are here... yet.</app-article-preview>
            }
        } @else if (state() === 'loading') {
            <app-article-preview>Loading articles...</app-article-preview>
        } @else {
            <app-article-preview>No articles are here... yet.</app-article-preview>
        }
    `
})
export class ArticleListComponent {
    articles = input.required<Article[]>();
    state = input.required<string>();
    toggleFavorite = output<Article>();
}
