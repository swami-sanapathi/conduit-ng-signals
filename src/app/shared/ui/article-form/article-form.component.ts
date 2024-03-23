import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article, NewArticle } from '../../models';

@Component({
    selector: 'app-shared-article-form',
    standalone: true,
    template: `
        <form #form="ngForm">
            <fieldset>
                <fieldset class="form-group">
                    <input
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Article Title"
                        name="title"
                        [(ngModel)]="articleFormData().title"
                    />
                </fieldset>
                <fieldset class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="What's this article about?"
                        name="description"
                        [(ngModel)]="articleFormData().description"
                    />
                </fieldset>
                <fieldset class="form-group">
                    <textarea
                        class="form-control"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                        name="body"
                        [(ngModel)]="articleFormData().body"
                    ></textarea>
                </fieldset>
                <fieldset class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter tags"
                        #tagInput
                        (keyup.enter)="addTag(tagInput); tagInput.value = ''"
                    />
                    <div class="tag-list">
                        @for (item of articleFormData().tagList; track $index) {
                            <span class="tag-default tag-pill">
                                <i class="ion-close-round" (click)="removeTag(item)"></i>
                                {{ item }}
                            </span>
                        }
                    </div>
                </fieldset>
                <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    [disabled]="!form.valid"
                    (click)="publish.emit(articleFormData())"
                >
                    Publish Article
                </button>
            </fieldset>
        </form>
    `,
    imports: [FormsModule]
})
export class AppSharedArticleFormComponent {
    protected articleFormData = signal<NewArticle>({
        title: '',
        description: '',
        body: '',
        tagList: []
    });

    article = input<Article>();
    publish = output<NewArticle>();

    constructor() {
        effect(
            () => {
                const article = this.article();
                if (article) {
                    this.articleFormData.set({
                        title: article.title,
                        description: article.description,
                        body: article.body || '',
                        tagList: article.tagList
                    });
                }
            },
            { allowSignalWrites: true }
        );
    }

    addTag(tagInput: HTMLInputElement) {
        if (!tagInput.value.trim() || this.articleFormData().tagList.includes(tagInput.value.trim())) return;

        this.articleFormData.update((data) => ({ ...data, tagList: [...data.tagList, tagInput.value] }));
    }

    removeTag(tag: string) {
        this.articleFormData.update((data) => ({ ...data, tagList: data.tagList.filter((item) => item !== tag) }));
    }
}
