import { Component, input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-input',
    standalone: true,
    template: ` <input type="text" /> `
})
export class InputComponent {
    // Let inference do its job !!

    foo = input(3);
    //^?

    foo2 = input(3, { transform: (value: number) => (isNaN(value) ? undefined : value) }); // what does it mean?

    //^?

    foo3 = input.required({ transform: (value: number) => (isNaN(value) ? undefined : value) });
    //^?

    foo4 = input.required({ transform: numberAttribute });
    //^?

    // Where explicit is necessary

    foo5 = input<number | null>(null);
    //^?

    foo6 = input.required<number>();
    //^?
}
