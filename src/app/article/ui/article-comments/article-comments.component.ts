import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comment } from '../../../shared/models';

@Component({
    selector: 'app-article-comments',
    template: `
        @for (comment of comments(); track $index) {
            <div class="card">
                <div class="card-block">
                    <p class="card-text">
                        {{ comment.body }}
                    </p>
                </div>
                <div class="card-footer">
                    <a [routerLink]="['/profile', comment.author.username]" class="comment-author">
                        <img [src]="comment.author.image" class="comment-author-img" />
                    </a>
                    &nbsp;
                    <a class="comment-author" [routerLink]="['/profile', comment.author.username]">
                        {{ comment.author.username }}
                    </a>
                    <span class="date-posted">{{ comment.createdAt | date: 'MMM, d, y' }}</span>

                    @if (isOwner()) {
                        <span class="mod-options" (click)="deleteComment.emit({ slug: slug(), id: comment.id })">
                            <i class="ion-trash-a"></i>
                        </span>
                    }
                </div>
            </div>
        }
    `,
    imports: [RouterLink, DatePipe]
})
export class ArticleCommentsComponent {
    isOwner = input.required<boolean>();
    comments = input.required<Comment[]>();
    slug = input.required<string>();
    deleteComment = output<{ slug: string; id: number }>();
}
