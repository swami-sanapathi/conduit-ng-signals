import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    template: `
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" routerLink="/">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            routerLink="/"
                            routerLinkActive="active"
                            [routerLinkActiveOptions]="{ exact: true }"
                        >
                            Home
                        </a>
                    </li>
                    @if (isAuthenticated()) {
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/editor']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                <i class="ion-compose"></i>
                                &nbsp;New Article
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/settings']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                <i class="ion-gear-a"></i>
                                &nbsp;Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/profile', username()]"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                <img [src]="" alt="{{ username() }}" class="user-pic" />
                                {{ username() }}
                            </a>
                        </li>
                    } @else {
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/login']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                Sign in
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/register']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                Sign up
                            </a>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    `
})
export class HeaderComponent {
    username = input.required();
    isAuthenticated = input.required<boolean>();
}
