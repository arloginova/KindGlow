export type ArticleBadge = 'vegan' | 'cruelty-free' | 'zero-waste';

export interface ArticleSection {
    id: string;
    title: string;
}

export interface Article {
    id: string;
    title: string;
    description: string;
    badges: ArticleBadge[];
    category: 'об осознанности' | 'бренды' | 'отечественный подход';
    backgroundImage?: string;
    /** Картинка для карточки и страницы статьи (десктоп) */
    squareImage?: string;
    /** Картинка для планшета */
    squareImageIpad?: string;
    /** Картинка для телефона */
    squareImageIphone?: string;
    sections: ArticleSection[];
    content: string;
}
