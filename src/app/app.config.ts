import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import {
    TitleStrategy,
    provideRouter,
    withComponentInputBinding,
    withHashLocation,
    withViewTransitions
} from '@angular/router';
import routes from './app.routes';
import { provideApiUrl } from './providers/api-url';
import { provideApiPrefix } from './shared/interceptors/api-prefix.interceptor';
import { provideAuthInterceptor } from './shared/interceptors/auth.interceptor';
import { TitleStrategyService } from './shared/services/title.service';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: TitleStrategy, useClass: TitleStrategyService },
        provideApiUrl({ url: 'https://api.realworld.io/api' }),
        provideRouter(routes, withViewTransitions(), withComponentInputBinding(), withHashLocation()),
        provideHttpClient(withInterceptors([provideApiPrefix, provideAuthInterceptor]))
    ]
};
