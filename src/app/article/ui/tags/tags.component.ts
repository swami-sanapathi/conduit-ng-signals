import { Component, input, output } from '@angular/core';
import { ApiStatus } from '../../../shared/models';

@Component({
    selector: 'app-tags',
    standalone: true,
    template: `
        <div class="sidebar">
            @if (status() === 'success') {
                <p>Popular Tags</p>
                <div class="tag-list">
                    @for (tag of tags(); track tag) {
                        <a
                            (click)="selectedTag.emit(tag)"
                            (keydown.enter)="selectedTag.emit(tag)"
                            tabindex="{{ $index }}"
                            class="tag-pill tag-default"
                            >{{ tag }}</a
                        >
                    }
                </div>
            } @else if (status() === 'loading') {
                <ng-container>loading...</ng-container>
            } @else {
                <ng-container>No tags are here... yet.</ng-container>
            }
        </div>
    `
})
export class TagsComponent {
    tags = input.required<string[]>();
    status = input.required<ApiStatus>();
    selectedTag = output<string>();
}
