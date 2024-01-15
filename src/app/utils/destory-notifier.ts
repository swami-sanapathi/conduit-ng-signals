import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function injectDestroy() {
    const destroyRef = inject(DestroyRef);
    return <T>() => takeUntilDestroyed<T>(destroyRef);
}
