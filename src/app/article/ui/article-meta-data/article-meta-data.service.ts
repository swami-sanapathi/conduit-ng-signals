import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ApiStatus, Article, Comment, UserProfile } from '../../../shared/models';
import { AuthService } from '../../../shared/services/auth.service';
import { injectDestroy } from '../../../utils/destory-notifier';

@Injectable()
export class ArticleBySlugService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private destroy = injectDestroy();
    private authService = inject(AuthService);
    private _article = signal<Article | null>(null);
    state = signal<ApiStatus>('loading');
    comments = signal<Comment[]>([]);
    authorArticle = this._article.asReadonly();
    isOwner = computed(() => {
        const username = this.authorArticle()?.author.username;
        return username === this.authService._user()?.username;
    });

    getArticleBySlug(slug: string) {
        this.state.set('loading');
        return this.http.get<{ article: Article }>(`/articles/${slug}`).subscribe(({ article }) => {
            this._article.set(article);
            this.state.set('success');
        });
    }

    postComment(newComment: string, slug: string | undefined) {
        this.destroy.next();
        return this.http
            .post<{ comment: Comment }>(`/articles/${slug}/comments`, { comment: { body: newComment } })
            .pipe(takeUntil(this.destroy))
            .subscribe(({ comment }) => {
                this.comments.update((cm) => [...cm, comment]);
            });
    }

    deleteComment({ slug, id }: { slug: string; id: number }) {
        this.destroy.next();
        return this.http
            .delete(`/articles/${slug}/comments/${id}`)
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
                this.comments.update((cm) => cm.filter((comment) => comment.id !== id));
            });
    }

    getComments(slug: string) {
        return this.http.get<{ comments: Comment[] }>(`/articles/${slug}/comments`).subscribe(({ comments }) => {
            this.comments.set(comments);
        });
    }

    toggleFavorite({ slug, favorited }: { slug: string; favorited: boolean }) {
        this.destroy.next();
        if (favorited) {
            return this.http
                .delete<{ article: Article }>(`/articles/${slug}/favorite`)
                .pipe(takeUntil(this.destroy))
                .subscribe(({ article }) => {
                    this._article.set(article);
                });
        }

        return this.http.post<{ article: Article }>(`/articles/${slug}/favorite`, null).subscribe(({ article }) => {
            this._article.set(article);
        });
    }

    toggleFollow({ username, following }: { username: string; following: boolean }) {
        this.destroy.next();
        if (following) {
            return this.http
                .delete<{ profile: UserProfile }>(`/profiles/${username}/follow`)
                .pipe(takeUntil(this.destroy))
                .subscribe(({ profile }) => {
                    this._article.update((article) => ({ ...article!, author: profile }));
                });
        }
        return this.http
            .post<{ profile: UserProfile }>(`/profiles/${username}/follow`, null)
            .subscribe(({ profile }) => {
                this._article.update((article) => ({ ...article!, author: profile }));
            });
    }

    deleteArticle(slug: string) {
        this.destroy.next();
        return this.http
            .delete(`/articles/${slug}`)
            .pipe(takeUntil(this.destroy))
            .subscribe(() => {
                this._article.set(null);
                this.router.navigate(['/']);
            });
    }
}
