import { Component } from '@angular/core';
import { ArticleListComponent } from '../article/ui/article-list/article-list.component';
import { SidebarComponent } from '../article/ui/sidebar/sidebar.component';
import { BannerComponent } from './banner/banner.component';
import { FeedToggleComponent } from './feed-toggle/feed-toggle.component';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
        <div class="home-page">
            <app-banner />

            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <app-feed-toggle />
                        <app-article-list />
                    </div>

                    <div class="col-md-3">
                        <app-sidebar />
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [BannerComponent, FeedToggleComponent, ArticleListComponent, SidebarComponent]
})
export default class HomeComponent {}
