import { Component, input, output } from '@angular/core';
import { Article } from '../../../shared/models/articles';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    selector: 'app-article-list',
    standalone: true,
    imports: [ArticlePreviewComponent],
    template: `
        @if (state() === 'success') {
            @for (article of articles(); track article.id) {
                <app-article-preview [article]="article" (toggleFavorite)="toggleFavorite.emit($event)" />
            } @empty {
                No articles are here... yet.
            }
        } @else if (state() === 'loading') {
            Loading articles...
        } @else {
            No articles are here... yet.
        }
    `
})
export class ArticleListComponent {
    articles = input.required<Article[]>();
    state = input.required<string>();
    toggleFavorite = output<Article>();
}
