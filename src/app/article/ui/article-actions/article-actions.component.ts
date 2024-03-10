import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../shared/models';

@Component({
    selector: 'app-article-meta-data-actions',
    standalone: true,
    template: `
        @if (article(); as article) {
            <div class="article-meta">
                <a><img [src]="article.author.image" /></a>
                <div class="info">
                    <a href="/profile/eric-simons" class="author">{{ article.author.username }}</a>
                    <span class="date">{{ article.createdAt | date: 'MMM d, y' }}</span>
                </div>
                @if (isOwner()) {
                    <a class="btn btn-sm btn-outline-secondary" [routerLink]="['/editor', article.slug]">
                        <i class="ion-edit"></i> Edit Article
                    </a>
                    &nbsp;
                    <button class="btn btn-sm btn-outline-danger" (click)="deleteArticle.emit(article.slug)">
                        <i class="ion-trash-a"></i> Delete Article
                    </button>
                } @else {
                    <button
                        class="btn btn-sm btn-outline-secondary"
                        (click)="
                            toggleFollow.emit({
                                username: article.author.username,
                                following: article.author.following
                            })
                        "
                    >
                        <i class="ion-plus-round"></i>
                        &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }}
                        {{ article.author.username }}
                        <!-- <span class="counter">()</span> -->
                    </button>
                    &nbsp;&nbsp;
                    <button
                        class="btn btn-sm btn-outline-primary"
                        (click)="toggleFavorite.emit({ slug: article.slug, favorited: article.favorited })"
                    >
                        <i class="ion-heart"></i>
                        &nbsp;
                        {{ article.favorited ? 'Unfavorite' : 'Favorite' }}
                        Post
                        <span class="counter">({{ article.favoritesCount }})</span>
                    </button>
                }
            </div>
        }
    `,
    imports: [RouterLink, DatePipe]
})
export class ArticleMetaDataActionsComponent {
    isOwner = input.required<boolean>();
    article = input.required<Article>();
    deleteArticle = output<string>();
    toggleFollow = output<{ username: string; following: boolean }>();
    toggleFavorite = output<{ slug: string; favorited: boolean }>();
}
