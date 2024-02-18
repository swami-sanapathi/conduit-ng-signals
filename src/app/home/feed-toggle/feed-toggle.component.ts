import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-feed-toggle',
    standalone: true,
    template: `
        <ul class="nav nav-pills outline-active">
            <li class="nav-item">
                <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events -->
                <a
                    class="nav-link"
                    [class.active]="feedType() === 'user' && !selectedTag()"
                    [class.disabled]="!isAuthenticated()"
                    (click)="isAuthenticated() && userFeed.emit()"
                    >Your Feed</a
                >
            </li>
            <li class="nav-item">
                <a
                    class="nav-link"
                    [class.active]="feedType() === 'global' && !selectedTag()"
                    (click)="globalFeed.emit()"
                    >Global Feed</a
                >
            </li>
            @if (selectedTag()) {
                <li class="nav-item">
                    <a class="nav-link active">#{{ selectedTag() }}</a>
                </li>
            }
        </ul>
    `
})
export class FeedToggleComponent {
    @Output() userFeed = new EventEmitter<string>();
    @Output() globalFeed = new EventEmitter<string>();
    feedType = input('global');
    isAuthenticated = input.required<boolean>();
    selectedTag = input<string | null>();
}
