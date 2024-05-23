import { InjectionToken, ValueProvider } from '@angular/core';

interface ApiConfig {
    url: string;
}

export const URL_TOKEN = new InjectionToken<ApiConfig>('URL TOKEN');

export function provideApiUrl(config: ApiConfig): ValueProvider {
    return {
        provide: URL_TOKEN,
        useValue: config
    };
}
