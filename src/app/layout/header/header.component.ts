import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    template: `
        @if (authService._isAuthenticated()) {
            <nav class="navbar navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="/">conduit</a>
                    <ul class="nav navbar-nav pull-xs-right">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/editor"> <i class="ion-compose"></i>&nbsp;New Article </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" [routerLink]="['/settings']">
                                <i class="ion-gear-a"></i>&nbsp;Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" [routerLink]="['/profile', authService._user()?.username]">
                                <img [src]="authService._user()?.image" alt="user" class="user-pic" />
                                {{ authService._user()?.username }}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        } @else {
            <nav class="navbar navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="/">conduit</a>
                    <ul class="nav navbar-nav pull-xs-right">
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                                >Home</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/login']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                                >Sign in</a
                            >
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                [routerLink]="['/register']"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                                >Sign up</a
                            >
                        </li>
                    </ul>
                </div>
            </nav>
        }
        <!-- Authenticated -->
    `
})
export class HeaderComponent {
    authService = inject(AuthService);
}
