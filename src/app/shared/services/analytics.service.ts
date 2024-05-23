/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-entire
import { Injectable, inject } from '@angular/core';
import { ENVIRONMENT } from '../../providers/environment-config';
import { WINDOW } from '../../providers/window';

export interface WindowsWithAnalytics extends Window {
    dataLayer?: any[];
    gtag?(...args: any[]): void;
}

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalytics {
    private window: WindowsWithAnalytics = inject(WINDOW);
    private readonly environment = inject(ENVIRONMENT);

    constructor() {
        this.registerGlobalSiteTag();
    }

    private registerGlobalSiteTag(): void {
        const window = this.window;
        const url = `https://www.googletagmanager.com/gtag/js?id=${this.environment.google_analytics_id}`;

        window.dataLayer = this.window?.dataLayer || [];
        window.gtag = function () {
            // eslint-disable-next-line prefer-rest-params
            window.dataLayer?.push(arguments);
        };

        window.gtag('js', new Date());
        window.gtag('config', this.environment.google_analytics_id);

        const gTagScript = window.document.querySelector('#gtag-script');
        if (gTagScript === null) {
            const element = window.document.createElement('script');
            element.id = 'gtag-script';
            element.async = true;
            element.src = url;
            window.document.head.appendChild(element);
        }
    }

    private _gTag(...args: any[]) {
        if (this.window.gtag) {
            this.window.gtag(...args);
        }
    }

    public trackEvent(action: string): void {
        this._gTag('event', action);
    }
}
