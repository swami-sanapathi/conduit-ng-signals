import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    template: `
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

        <!-- Authenticated -->
        <!-- <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a class="nav-link active" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/editor">
              <i class="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/profile/eric-simons">
              <img src="" class="user-pic" />
              Eric Simons
            </a>
          </li>
        </ul>
      </div>
    </nav> -->
    `
})
export class HeaderComponent {}
