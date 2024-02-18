import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-tags',
    standalone: true,
    template: `
        <div class="sidebar">
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
        </div>
    `
})
export class TagsComponent {
    tags = input.required<string[]>();
    @Output() selectedTag = new EventEmitter<string>();
}