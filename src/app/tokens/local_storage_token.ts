import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage | null>('localStorage', {
    factory: () => {
        const document = inject(DOCUMENT).defaultView;
        if (document) return document.localStorage;
        return null;
    }
});
