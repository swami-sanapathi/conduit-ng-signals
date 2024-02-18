import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
    selector: 'app-profile-article-toggle',
    standalone: true,
    template: `
        <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        [routerLink]="['/profile', username()]"
                        routerLinkActive="active"
                        [routerLinkActiveOptions]="{ exact: true }"
                        >My Articles</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        [routerLink]="['/profile', username(), 'favorites']"
                        [routerLinkActiveOptions]="{ exact: true }"
                        routerLinkActive="active"
                        >Favorited Articles</a
                    >
                </li>
            </ul>
        </div>
    `,
    imports: [RouterLink, RouterLinkActive]
})
export class ProfileArticleToggleComponent {
    username = input.required();
}
