import { signalStore, withMethods, withState } from '@ngrx/signals';
import { Article } from '../models/article';

const articles = signalStore(
    withState<{ articles: Article[] }>({ articles: [] }),
    withMethods(({ articles }) => ({
        init() {},

        addArticle(article: Article) {
            return { articles: [...articles(), article] };
        }
    }))
);
