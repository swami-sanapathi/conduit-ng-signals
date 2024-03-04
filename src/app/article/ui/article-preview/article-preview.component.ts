import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Article } from '../../../shared/models/articles';

@Component({
    selector: 'app-article-preview',
    standalone: true,
    template: `
        @if (article()) {
            <div class="article-preview">
                <div class="article-meta">
                    <a [routerLink]="['/profile', article().author.username]" routerLinkActive="router-link-active"
                        ><img alt="user" [src]="article().author.image"
                    /></a>
                    <div class="info">
                        <a [routerLink]="['/profile', article().author.username]" class="author">{{
                            article().author.username
                        }}</a>
                        <span class="date">{{ article().createdAt }}</span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm pull-xs-right">
                        <i class="ion-heart"></i> {{ article().favoritesCount }}
                    </button>
                </div>
                <a class="preview-link" (click)="navigateToArticle(article().slug)">
                    <h1>{{ article().title }}</h1>
                    <p>{{ article().description }}</p>
                    <span>Read more...</span>
                </a>
            </div>
        } @else {
            <ng-content></ng-content>
        }
    `,
    imports: [RouterLink]
})
export class ArticlePreviewComponent {
    article = input.required<Article>();

    private router = inject(Router);

    navigateToArticle(slug: string) {
        this.router.navigate(['/article', slug]);
    }
}
