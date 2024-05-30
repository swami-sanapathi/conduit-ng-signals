import { DOCUMENT } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import {
    TitleStrategy,
    provideRouter,
    withComponentInputBinding,
    withHashLocation,
    withViewTransitions
} from '@angular/router';
import routes from './app.routes';
import environment from './environment';
import { provideApiUrl } from './providers/api-url';
import { ENVIRONMENT } from './providers/environment-config';
import { WINDOW, windowProvider } from './providers/window';
import { provideApiPrefix } from './shared/interceptors/api-prefix.interceptor';
import { provideAuthInterceptor } from './shared/interceptors/auth.interceptor';
import { GoogleAnalytics } from './shared/services/analytics.service';
import { TitleStrategyService } from './shared/services/title.service';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: TitleStrategy, useClass: TitleStrategyService },
        { provide: ENVIRONMENT, useValue: environment },
        { provide: ENVIRONMENT_INITIALIZER, useValue: () => inject(GoogleAnalytics), multi: true },
        { provide: WINDOW, useFactory: (document: Document) => windowProvider(document), deps: [DOCUMENT] },
        provideApiUrl({ url: 'https://api.realworld.io/api' }),
        provideRouter(routes, withViewTransitions(), withComponentInputBinding(), withHashLocation()),
        provideHttpClient(withInterceptors([provideApiPrefix, provideAuthInterceptor]))
    ]
};
