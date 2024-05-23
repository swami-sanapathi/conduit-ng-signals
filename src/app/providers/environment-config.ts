import { InjectionToken } from '@angular/core';

interface EnvironmentConfig {
    production: boolean;
    google_analytics_id: string;
}

export const ENVIRONMENT = new InjectionToken<EnvironmentConfig>('ENVIRONMENT');
