import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleMetaDataActionsComponent } from '../article-actions/article-actions.component';
import { ArticleCommentFormComponent } from '../article-comment-form/article-comment-form.component';
import { ArticleCommentsComponent } from '../article-comments/article-comments.component';
import { ArticleBySlugService } from './article-meta-data.service';

@Component({
    selector: 'app-article-full-preview',
    standalone: true,
    template: `
        @if (articleService.authorArticle(); as article) {
            <div class="block article-page">
                <div class="banner">
                    <div class="container">
                        <h1>{{ article.title }}</h1>
                        <app-article-meta-data-actions
                            [article]="article"
                            [isOwner]="articleService.isOwner()"
                            (deleteArticle)="articleService.deleteArticle($event)"
                            (toggleFollow)="articleService.toggleFollow($event)"
                            (toggleFavorite)="articleService.toggleFavorite($event)"
                        />
                    </div>
                </div>

                <div class="container page">
                    <div class="row article-content">
                        <div class="col-md-12">
                            <!-- <p>{{ article.title }}</p> -->
                            <!-- <h2 id="introducing-ionic">{{ article.description }}</h2> -->
                            <div class="body" [innerHTML]="article.body"></div>
                            @if (article.tagList.length) {
                                <ul class="tag-list">
                                    @for (tag of article.tagList; track $index) {
                                        <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
                                    }
                                </ul>
                            }
                        </div>
                    </div>

                    <hr />

                    <div class="article-actions">
                        <app-article-meta-data-actions
                            [article]="article"
                            [isOwner]="articleService.isOwner()"
                            (deleteArticle)="articleService.deleteArticle($event)"
                            (toggleFollow)="articleService.toggleFollow($event)"
                            (toggleFavorite)="articleService.toggleFavorite($event)"
                        />
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-md-8 offset-md-2">
                            @if (articleService.authorArticle()?.author; as author) {
                                <app-article-comment-form
                                    [author]="author"
                                    (newComment)="articleService.postComment($event, article.slug)"
                                />
                            }

                            <app-article-comments
                                [comments]="articleService.comments()"
                                [isOwner]="articleService.isOwner()"
                                [slug]="article.slug"
                                (deleteComment)="articleService.deleteComment($event)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        } @else {
            <div class="article-preview">Loading...</div>
        }
    `,
    providers: [ArticleBySlugService],
    imports: [RouterLink, ArticleMetaDataActionsComponent, ArticleCommentsComponent, ArticleCommentFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ArticleFullPreviewComponent {
    slug = input.required<string>();
    public readonly articleService = inject(ArticleBySlugService);

    constructor() {
        effect(
            () => {
                this.articleService.getArticleBySlug(this.slug());
                this.articleService.getComments(this.slug());
            },
            { allowSignalWrites: true }
        );
    }
}
