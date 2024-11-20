import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArticleListComponent } from '../article/ui/article-list/article-list.component';
import { TagsComponent } from '../article/ui/tags/tags.component';
import { ArticlesService } from '../data-access/articles.service';
import { TagsService } from '../data-access/tags.service';
import { AuthService } from '../shared/services/auth.service';
import { BannerComponent } from './banner/banner.component';
import { FeedToggleComponent } from './feed-toggle/feed-toggle.component';

@Component({
    template: `
        <div class="home-page">
            <app-banner />

            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <app-feed-toggle
                            [isAuthenticated]="authService._isAuthenticated()"
                            [feedType]="articlesService.feedType()"
                            [selectedTag]="articlesService.selectedTag()"
                            (userFeed)="articlesService.getArticles('user')"
                            (globalFeed)="articlesService.getArticles('global')"
                        />
                        <app-article-list
                            [articles]="articlesService.articles()"
                            [state]="articlesService.state()"
                            (toggleFavorite)="articlesService.toggleFavorite($event)"
                        />
                    </div>

                    <div class="col-md-3">
                        <app-tags
                            [tags]="tagsService.tags()"
                            [status]="tagsService.status()"
                            (selectedTag)="getArticlesByTag($event)"
                        />
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [BannerComponent, FeedToggleComponent, ArticleListComponent, TagsComponent],
    providers: [ArticlesService, TagsService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {
    constructor(
        public articlesService: ArticlesService,
        public tagsService: TagsService,
        public authService: AuthService
    ) {
        // use combineLatest to get both articles and tags
        this.articlesService.getArticles();
        this.tagsService.getTags();
    }

    getArticlesByTag(tag: string) {
        this.articlesService.getArticles('global', tag);
    }
}
