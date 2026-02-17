export interface Product {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    badges: string[]; // e.g., ['vegan', 'cruelty-free', 'bestseller']
    application: string;
    composition: string;
    link: string;
    images: {
        desktop: string;
        tablet: string;
        mobile: string;
    };
    largeImages?: {
        desktop: string;
        tablet: string;
        mobile: string;
    };
    category: string;
    isTall?: boolean;
}
