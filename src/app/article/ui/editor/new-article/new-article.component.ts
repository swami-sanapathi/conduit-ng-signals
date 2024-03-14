import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppSharedArticleFormComponent } from '../../../../shared/ui/article-form/article-form.component';
import { AppSharedLayoutComponent } from '../../../../shared/ui/shared-layout/shared-layout.component';
import { EditArticleService } from '../editor.service';

@Component({
    selector: 'app-new-article',
    standalone: true,
    template: `
        <app-shared-layout>
            <app-shared-article-form (publish)="articleService.publishArticle($event, 'new')" />
        </app-shared-layout>
    `,
    providers: [EditArticleService],
    imports: [AppSharedLayoutComponent, AppSharedArticleFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NewArticleComponent {
    articleService = inject(EditArticleService);
}
