import { Author } from './author';

export interface Article {
    id: number;
    title: string;
    slug: string;
    body: string;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    description: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}
