import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Author } from '../../../shared/models';

@Component({
    selector: 'app-article-comment-form',
    standalone: true,
    template: `
        <form class="card comment-form" #form="ngForm">
            <div class="card-block">
                <textarea class="form-control" placeholder="Write a comment..." rows="3" #comment></textarea>
            </div>
            <div class="card-footer">
                <img [src]="author().image" class="comment-author-img" />
                <button
                    class="btn btn-sm btn-primary"
                    (click)="postComment(comment); comment.value = ''"
                    [disabled]="!form.valid"
                >
                    Post Comment
                </button>
            </div>
        </form>
    `,
    imports: [FormsModule]
})
export class ArticleCommentFormComponent {
    author = input.required<Author>();
    newComment = output<string>();

    postComment(comment: HTMLTextAreaElement) {
        const cmt = comment.value.trim();
        if (!comment.value.trim()) return;
        this.newComment.emit(cmt);
    }
}
