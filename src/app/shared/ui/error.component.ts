import { Component, input } from '@angular/core';

@Component({
    selector: 'app-error',
    standalone: true,
    template: `
        @if (errors(); as errs) {
            <ul class="error-messages">
                @for (err of errs; track err) {
                    <li>{{ err }}</li>
                }
            </ul>
        }
    `
})
export class ErrorComponent {
    errors = input.required<string[]>();
}
