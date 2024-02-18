import { InjectionToken, Provider } from '@angular/core';
import { ProfileFeed } from '../shared/models/profile-toggle-types';

export const PROFILE_TOGGLE_TYPE = new InjectionToken<ProfileFeed>('Toggle type');

export function provideProfileToggle(type: ProfileFeed): Provider {
    return {
        provide: PROFILE_TOGGLE_TYPE,
        useValue: type
    };
}
