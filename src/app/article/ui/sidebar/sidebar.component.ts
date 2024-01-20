import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    template: `
        <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                @for (tag of tags(); track tag) {
                    <a
                        (click)="selectedTag.emit(tag)"
                        (keydown.enter)="selectedTag.emit(tag)"
                        tabindex="0"
                        class="tag-pill tag-default"
                        >{{ tag }}</a
                    >
                }
            </div>
        </div>
    `
})
export class SidebarComponent {
    tags = input.required<string[]>();
    @Output() selectedTag = new EventEmitter<string>();
}
