export interface TestQuestion {
    id: number;
    question: string;
    options: string[];
}

export interface TestResult {
    variant: number;
    productIds: string[]; // ID продуктов из категории "лицо"
}

export interface TestAnswer {
    questionId: number;
    answer: string;
}
