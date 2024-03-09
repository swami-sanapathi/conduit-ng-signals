import { DatePipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { ArticleBySlugService } from './article-by-slug.service';

@Component({
    selector: 'app-article-full-preview',
    standalone: true,
    template: `
        @if (articleService.state() === 'success') {
            <div class="article-page">
                <div class="banner">
                    <div class="container">
                        <h1>{{ articleService.authorArticle()?.title }}</h1>

                        <div class="article-meta">
                            <a><img [src]="articleService.authorArticle()?.author?.image" /></a>
                            <div class="info">
                                <a href="/profile/eric-simons" class="author">{{
                                    articleService.authorArticle()?.author?.username
                                }}</a>
                                <span class="date">{{
                                    articleService.authorArticle()?.createdAt | date: 'MMMM d, y'
                                }}</span>
                            </div>
                            @if (!articleService.isOwner()) {
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="ion-plus-round"></i>
                                    &nbsp; Follow {{ articleService.authorArticle()?.author?.username }}
                                    <span class="counter">(10)</span>
                                </button>
                                &nbsp;&nbsp;
                                <button class="btn btn-sm btn-outline-primary">
                                    <i class="ion-heart"></i>
                                    &nbsp; Favorite Post
                                    <span class="counter">({{ articleService.authorArticle()?.favoritesCount }})</span>
                                </button>
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="ion-edit"></i> Edit Article
                                </button>
                                <button class="btn btn-sm btn-outline-danger">
                                    <i class="ion-trash-a"></i> Delete Article
                                </button>
                            }
                        </div>
                    </div>
                </div>

                <div class="container page">
                    <div class="row article-content">
                        <div class="col-md-12">
                            <p>{{ articleService.authorArticle()?.title }}</p>
                            <h2 id="introducing-ionic">{{ articleService.authorArticle()?.description }}</h2>
                            <p>{{ articleService.authorArticle()?.body }}</p>

                            @if (articleService.authorArticle()?.tagList?.length) {
                                <ul class="tag-list">
                                    @for (tag of articleService.authorArticle()?.tagList; track $index) {
                                        <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
                                    }
                                </ul>
                            }
                        </div>
                    </div>

                    <hr />

                    <div class="article-actions">
                        <div class="article-meta">
                            <a href="profile.html"><img [src]="articleService.authorArticle()?.author?.image" /></a>
                            <div class="info">
                                <a href="" class="author">{{ articleService.authorArticle()?.author?.username }}</a>
                                <span class="date">{{
                                    articleService.authorArticle()?.createdAt | date: 'MMMM d, y'
                                }}</span>
                            </div>

                            @if (!articleService.isOwner()) {
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="ion-plus-round"></i>
                                    &nbsp; Follow {{ articleService.authorArticle()?.author?.username }}
                                </button>
                                &nbsp;
                                <button class="btn btn-sm btn-outline-primary">
                                    <i class="ion-heart"></i>
                                    &nbsp; Favorite Article
                                    <span class="counter">({{ articleService.authorArticle()?.favoritesCount }})</span>
                                </button>
                                <button class="btn btn-sm btn-outline-secondary">
                                    <i class="ion-edit"></i> Edit Article
                                </button>
                                <button class="btn btn-sm btn-outline-danger">
                                    <i class="ion-trash-a"></i> Delete Article
                                </button>
                            }
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-md-8 offset-md-2">
                            <form class="card comment-form">
                                <div class="card-block">
                                    <textarea
                                        class="form-control"
                                        placeholder="Write a comment..."
                                        rows="3"
                                        #comment
                                    ></textarea>
                                </div>
                                <div class="card-footer">
                                    <img
                                        [src]="articleService.authorArticle()?.author?.image"
                                        class="comment-author-img"
                                    />
                                    <button
                                        class="btn btn-sm btn-primary"
                                        (click)="
                                            articleService.postComment(
                                                articleService.authorArticle()?.slug,
                                                comment.value
                                            );
                                            comment.value = ''
                                        "
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </form>

                            @if (articleService.comments().length) {
                                @for (comment of articleService.comments(); track $index) {
                                    <div class="card">
                                        <div class="card-block">
                                            <p class="card-text">
                                                {{ comment }}
                                            </p>
                                        </div>
                                        <div class="card-footer">
                                            <a href="/profile/author" class="comment-author">
                                                <img [src]="comment.author.image" class="comment-author-img" />
                                            </a>
                                            &nbsp;
                                            <a href="/profile/jacob-schmidt" class="comment-author">{{
                                                comment.author.username
                                            }}</a>
                                            <span class="date-posted">{{
                                                comment.createdAt | date: 'MMMM, d, y'
                                            }}</span>
                                        </div>
                                    </div>
                                }
                            }
                        </div>
                    </div>
                </div>
            </div>
        } @else {
            <div class="article-preview">Loading...</div>
        }
    `,
    providers: [ArticleBySlugService],
    imports: [DatePipe]
})
export default class ArticleFullPreviewComponent {
    slug = input.required<string>();
    public readonly articleService = inject(ArticleBySlugService);

    constructor() {
        effect(
            () => {
                this.articleService.getArticleBySlug(this.slug());
            },
            { allowSignalWrites: true }
        );
    }
}
