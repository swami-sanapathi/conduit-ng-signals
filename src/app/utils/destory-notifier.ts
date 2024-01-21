import { DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

export function injectDestroy() {
    const subject = new Subject<void>();
    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
        subject.next();
        subject.complete();
    });

    return subject;
}
