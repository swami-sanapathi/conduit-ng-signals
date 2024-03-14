import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedArticleFormComponent } from '../../../../shared/ui/article-form/article-form.component';
import { ErrorComponent } from '../../../../shared/ui/error.component';
import { AppSharedLayoutComponent } from '../../../../shared/ui/shared-layout/shared-layout.component';
import { EditArticleService } from '../editor.service';

@Component({
    selector: 'app-edit-article',
    standalone: true,
    template: `
        <app-shared-layout>
            @if (articleService.article(); as article) {
                <app-shared-article-form
                    [article]="article"
                    (publish)="articleService.publishArticle($event, 'update')"
                />
            }
        </app-shared-layout>
    `,
    providers: [EditArticleService],
    imports: [ReactiveFormsModule, ErrorComponent, AppSharedArticleFormComponent, AppSharedLayoutComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EditArticleComponent {
    articleService = inject(EditArticleService);
    slug = input<string>();

    constructor() {
        effect(
            () => {
                const slug = this.slug();
                if (slug) {
                    this.articleService.getArticle(slug);
                }
            },
            { allowSignalWrites: true }
        );
    }
}
