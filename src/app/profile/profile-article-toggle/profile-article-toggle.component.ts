import { Component, input } from '@angular/core';
import { ProfileFeed } from '../../shared/models';
@Component({
    selector: 'app-profile-article-toggle',
    standalone: true,
    template: `
        <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                    <a class="nav-link" [class.active]="toggleType() === 'my'">My Articles</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" [class.active]="toggleType() === 'favorited'">Favorited Articles</a>
                </li>
            </ul>
        </div>
    `
})
export class ProfileArticleToggleComponent {
    toggleType = input<ProfileFeed>('my');
}
