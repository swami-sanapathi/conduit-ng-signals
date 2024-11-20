import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-layout',
    template: `
        <app-header [username]="authService._user()?.username" [isAuthenticated]="authService._isAuthenticated()" />

        <router-outlet />
        <app-footer />
    `,
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {
    authService = inject(AuthService);
}
