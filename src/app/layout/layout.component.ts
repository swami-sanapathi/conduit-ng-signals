import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: `
        <app-header />
        <router-outlet />
        <app-footer />
    `,
    imports: [HeaderComponent, FooterComponent, RouterOutlet]
})
export default class LayoutComponent {}
