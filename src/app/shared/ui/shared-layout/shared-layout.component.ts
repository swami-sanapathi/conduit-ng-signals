import { Component } from '@angular/core';

@Component({
    selector: 'app-shared-layout',
    standalone: true,
    template: `
        <div class="editor-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-10 offset-md-1 col-xs-12">
                        <ng-content />
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppSharedLayoutComponent {}
