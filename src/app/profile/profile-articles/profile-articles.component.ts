import { Component, inject, signal } from '@angular/core';
import { ArticleListComponent } from '../../article/ui/article-list/article-list.component';
import { Article } from '../../shared/models';
import { ProfileArticleService } from '../profile-article.service';

@Component({
    standalone: true,
    template: ` <app-article-list
        [articles]="profileArticleService.articles()"
        [state]="profileArticleService.state()"
    />`,
    imports: [ArticleListComponent],
    providers: [ProfileArticleService]
})
export default class ProfileArticlesComponent {
    articles = signal<Article[]>([]);
    profileArticleService = inject(ProfileArticleService);
    constructor() {}
}
