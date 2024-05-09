import { Component, input } from '@angular/core';

@Component({
    selector: 'app-input-ex',

    template: `
        <button>
            @if (sort() === 'asc') {
                <span class="asc">
                    <i class="fa fa-sort-asc"></i>
                </span>
                {{ ascText() }}
            } @else {
                <span class="desc">
                    <i class="fa fa-sort-desc"></i>
                </span>
                {{ descText() }}
            }
        </button>
    `,
    standalone: true
})
export class InputComponent {
    sort = input<string>();
    ascText = input<string>();
    descText = input<string>();
}
