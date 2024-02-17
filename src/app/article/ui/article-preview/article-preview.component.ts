import { Component, input } from '@angular/core';
import { Article } from '../../../shared/models/articles';

@Component({
    selector: 'app-article-preview',
    standalone: true,
    template: `
        @if (article()) {
            <div class="article-preview">
                <div class="article-meta">
                    <a href="profile.html"><img alt="user" [src]="article()?.author?.image" /></a>
                    <div class="info">
                        <a href="" class="author">{{ article()?.author?.username }}</a>
                        <span class="date">{{ article()?.createdAt }}</span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm pull-xs-right">
                        <i class="ion-heart"></i> {{ article()?.favoritesCount }}
                    </button>
                </div>
                <a href="" class="preview-link">
                    <h1>{{ article()?.title }}</h1>
                    <p>{{ article()?.description }}</p>
                    <span>Read more...</span>
                </a>
            </div>
        } @else {
            <ng-content></ng-content>
        }
    `
})
export class ArticlePreviewComponent {
    article = input<Article>();
}
