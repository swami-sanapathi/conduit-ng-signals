import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewArticle } from '../../../shared/models/new-article';
import { ErrorComponent } from '../../../shared/ui/error.component';
import { EditArticleService } from './edit-article.service';

@Component({
    selector: 'app-edit-article',
    standalone: true,
    template: ` <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    @defer (when articleService.errors().length) {
                        <app-error [errors]="articleService.errors()" />
                    }

                    <form [formGroup]="articleForm">
                        <fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control form-control-lg"
                                    placeholder="Article Title"
                                    formControlName="title"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="What's this article about?"
                                    formControlName="description"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    class="form-control"
                                    rows="8"
                                    placeholder="Write your article (in markdown)"
                                    formControlName="body"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter tags"
                                    #tagInput
                                    (keyup.enter)="addTag(tagInput.value); tagInput.value = ''"
                                />
                                <div class="tag-list">
                                    @for (item of articleForm.get('tagList')?.value; track $index) {
                                        <span class="tag-default tag-pill">
                                            <i class="ion-close-round" (click)="removeTag(item)"></i> {{ item }}
                                        </span>
                                    }
                                </div>
                            </fieldset>
                            <button
                                class="btn btn-lg pull-xs-right btn-primary"
                                type="button"
                                [disabled]="!articleForm.valid"
                                (click)="articleService.publishArticle(articleForm.value)"
                            >
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>`,
    imports: [ReactiveFormsModule, ErrorComponent],
    providers: [EditArticleService]
})
export default class EditArticleComponent {
    article$ = input<NewArticle>();
    articleService = inject(EditArticleService);

    articleForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.articleForm = this.formBuilder.nonNullable.group({
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            body: new FormControl('', [Validators.required]),
            tagList: new FormControl([])
        });
    }

    addTag(tag: string) {
        if (!tag.trim()) return;

        const tagList = this.articleForm.get('tagList') as FormControl;
        tagList.setValue([...tagList.value, tag]);
    }

    removeTag(tag: string) {
        const tagList = this.articleForm.get('tagList') as FormControl;
        tagList.setValue(tagList.value.filter((item: string) => item !== tag));
    }
}
