import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../shared/models/articles';

@Component({
    selector: 'app-article-preview',
    standalone: true,
    template: `
        <div class="article-preview">
            @if (article(); as article) {
                <div class="article-meta">
                    <a [routerLink]="['/profile', article.author.username]" routerLinkActive="router-link-active">
                        <img alt="user" [src]="article.author.image" />
                    </a>
                    <div class="info">
                        <a [routerLink]="['/profile', article.author.username]" class="author">
                            {{ article.author.username }}
                        </a>
                        <span class="date">{{ article.createdAt | date: 'MMM d, y' }}</span>
                    </div>
                    <button
                        class="btn btn-sm pull-xs-right"
                        [class.btn-outline-primary]="!article.favorited"
                        [class.btn-primary]="article.favorited"
                        (click)="toggleFavorite.emit(article)"
                    >
                        <i class="ion-heart"></i>
                        {{ article.favoritesCount }}
                    </button>
                </div>
                <a class="preview-link" [routerLink]="['/article', article.slug]">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>

                    <ul class="tag-list">
                        @for (tag of article.tagList; track $index) {
                            <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
                        }
                    </ul>
                    <span>Read more...</span>
                </a>
            } @else {
                <ng-content></ng-content>
            }
        </div>
    `,
    imports: [RouterLink, DatePipe]
})
export class ArticlePreviewComponent {
    article = input<Article>();
    toggleFavorite = output<Article>();
}
