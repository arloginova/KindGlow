import { TestAnswer, TestResult } from '@/types/test';

// Вспомогательная функция для проверки ответа (одиночный или множественный)
function checkAnswer(answer: string | string[], ...validOptions: string[]): boolean {
    if (Array.isArray(answer)) {
        // Для множественного выбора проверяем, есть ли хотя бы одно совпадение
        return answer.some(a => validOptions.includes(a));
    }
    return validOptions.includes(answer);
}

export function calculateTestResult(answers: TestAnswer[]): TestResult {
    const answerMap = new Map(answers.map(a => [a.questionId, a.answer]));

    const q1 = answerMap.get(1) || '';
    const q2 = answerMap.get(2) || '';
    const q3 = answerMap.get(3) || '';
    const q4 = answerMap.get(4) || '';
    const q5 = answerMap.get(5) || '';
    const q6 = answerMap.get(6) || '';

    // ВАРИАНТ 1: сухой/нормальный + сухость/ничего не беспокоит + кремы/пока не знаю + главное чтобы работало/пока не разбираюсь + 5-10 минут/как получится + cruelty free/vegan/важны
    if (
        checkAnswer(q1, 'сухой', 'нормальный') &&
        checkAnswer(q2, 'сухость', 'ничего не беспокоит') &&
        checkAnswer(q3, 'кремы', 'пока не знаю') &&
        checkAnswer(q4, 'главное - чтобы работало', 'пока не разбираюсь') &&
        checkAnswer(q5, '5-10 минут', 'как получится') &&
        checkAnswer(q6, 'cruelty free', 'vegan', 'важны, но пока разбираюсь')
    ) {
        return {
            variant: 1,
            productIndices: [9, 2, 3, 13, 9, 8]
        };
    }

    // ВАРИАНТ 2: комбинированный/нормальный/жирный + высыпания/ничего не беспокоит/чувствительность + масла бальзамы/пока не знаю + главное чтобы работало/пока не разбираюсь/максимально натуральное + любой + любой
    if (
        checkAnswer(q1, 'комбинированный', 'нормальный', 'жирный') &&
        checkAnswer(q2, 'высыпания', 'ничего не беспокоит', 'чувствительность') &&
        checkAnswer(q3, 'масла, бальзамы', 'пока не знаю')
    ) {
        // Дополнительная проверка для q4 (если указан)
        if (q4 && !checkAnswer(q4, 'главное - чтобы работало', 'пока не разбираюсь', 'максимально натуральное', 'минимальный состав')) {
            // Если q4 не подходит, пропускаем этот вариант
        } else {
            return {
                variant: 2,
                productIndices: [16, 19, 8, 2, 9, 8]
            };
        }
    }

    // ВАРИАНТ 3: любой + любой + легкие гели/пока не знаю + любой + любой + любой
    if (checkAnswer(q3, 'легкие гели', 'пока не знаю')) {
        return {
            variant: 3,
            productIndices: [18, 16, 13, 11, 9, 8]
        };
    }

    // По умолчанию возвращаем вариант 3
    return {
        variant: 3,
        productIndices: [18, 16, 13, 11, 9, 8]
    };
}
