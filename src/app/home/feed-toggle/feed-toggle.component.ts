import { Component } from '@angular/core';

@Component({
    selector: 'app-feed-toggle',
    standalone: true,
    template: `
        <ul class="nav nav-pills outline-active">
            <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
            </li>
        </ul>
    `
})
export class FeedToggleComponent {}
