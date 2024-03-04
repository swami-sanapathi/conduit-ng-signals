import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiStatus, Article, Comment } from '../../../shared/models';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class ArticleBySlugService {
    private http = inject(HttpClient);
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

    postComment(slug: string | undefined, newComment: string) {
        return this.http
            .post<{ comment: Comment }>(`/articles/${slug}/comments`, { comment: { body: newComment } })
            .subscribe(({ comment }) => {
                this.comments.update((cm) => [...cm, comment]);
            });
    }

    getComments(slug: string) {
        return this.http.get<{ comments: Comment[] }>(`/articles/${slug}/comments`).subscribe(({ comments }) => {
            this.comments.set(comments);
        });
    }
}
