import { Component } from '@angular/core';
import { ArticlesService } from '../../../data-access/articles.service';

@Component({
    selector: 'app-article-list',
    standalone: true,
    providers: [ArticlesService],
    template: `
        <div class="article-preview">
            <div class="article-meta">
                <a href="profile.html"><img alt="user" src="http://i.imgur.com/Qr71crq.jpg" /></a>
                <div class="info">
                    <a href="" class="author">Eric Simons</a>
                    <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> 29</button>
            </div>
            <a href="" class="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
            </a>
        </div>

        <div class="article-preview">
            <div class="article-meta">
                <a href="profile.html"><img alt="user" src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
                <div class="info">
                    <a href="" class="author">Albert Pai</a>
                    <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right"><i class="ion-heart"></i> 32</button>
            </div>
            <a href="" class="preview-link">
                <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul class="tag-list">
                    <li class="tag-default tag-pill tag-outline">Music</li>
                    <li class="tag-default tag-pill tag-outline">Song</li>
                </ul>
            </a>
        </div>
    `
})
export class ArticleListComponent {
    constructor(public articlesService: ArticlesService) {
        this.articlesService.getArticles();
    }
}
