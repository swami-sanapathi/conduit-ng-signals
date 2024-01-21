import { Component } from '@angular/core';
import { ArticleListComponent } from '../article/ui/article-list/article-list.component';
import { SidebarComponent } from '../article/ui/sidebar/sidebar.component';
import { ArticlesService } from '../data-access/articles.service';
import { TagsService } from '../data-access/tags.service';
import { BannerComponent } from './banner/banner.component';
import { FeedToggleComponent } from './feed-toggle/feed-toggle.component';

@Component({
    standalone: true,
    template: `
        <div class="home-page">
            <app-banner />

            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <app-feed-toggle />
                        <app-article-list [articles]="articlesService.articles()" [state]="articlesService.state()" />
                    </div>

                    <div class="col-md-3">
                        <app-sidebar [tags]="tagsService.tags()" (selectedTag)="getArticlesByTag($event)" />
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [BannerComponent, FeedToggleComponent, ArticleListComponent, SidebarComponent],
    providers: [ArticlesService, TagsService]
})
export default class HomeComponent {
    constructor(
        public articlesService: ArticlesService,
        public tagsService: TagsService
    ) {
        // use combineLatest to get both articles and tags
        this.articlesService.getArticles();
        this.tagsService.getTags();
    }

    getArticlesByTag(tag: string) {
        this.articlesService.getArticlesByTag(tag);
    }
}
