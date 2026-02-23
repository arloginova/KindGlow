export interface TestQuestion {
    id: number;
    question: string;
    options: string[];
    allowMultiple?: boolean; // Разрешить множественный выбор
}

export interface TestResult {
    variant: number;
    productIndices: number[]; // Порядковые номера продуктов из категории "лицо" (1-21)
}

export interface TestAnswer {
    questionId: number;
    answer: string | string[]; // Может быть одиночный ответ или массив ответов
}
