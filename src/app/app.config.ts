import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter, withViewTransitions } from '@angular/router';
import routes from './app.routes';
import { provideApiPrefix } from './shared/interceptors/api-prefix.interceptor';
import { provideAuthInterceptor } from './shared/interceptors/auth.interceptor';
import { TitleStrategyService } from './shared/services/title.service';
import { provideApiUrl } from './tokens/api-url';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: TitleStrategy, useClass: TitleStrategyService },
        provideApiUrl({ url: 'https://api.realworld.io/api' }),
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(withInterceptors([provideApiPrefix, provideAuthInterceptor]))
    ]
};
