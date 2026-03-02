'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { testQuestions } from '@/data/testQuestions';
import { calculateTestResult } from '@/data/testLogic';
import { TestAnswer } from '@/types/test';

export default function TestPage() {
    const router = useRouter();
    const [testStarted, setTestStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<TestAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]); // Для множественного выбора

    const currentQuestion = testQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;
    const isMultipleChoice = currentQuestion.allowMultiple;

    const handleAnswerSelect = (answer: string) => {
        if (isMultipleChoice) {
            // Множественный выбор
            setSelectedAnswers(prev => {
                if (prev.includes(answer)) {
                    return prev.filter(a => a !== answer);
                } else {
                    return [...prev, answer];
                }
            });
        } else {
            // Одиночный выбор
            setSelectedAnswer(answer);
        }
    };

    const handleNextQuestion = () => {
        const answerValue = isMultipleChoice ? selectedAnswers : selectedAnswer;
        
        if (isMultipleChoice && selectedAnswers.length === 0) return;
        if (!isMultipleChoice && !selectedAnswer) return;

        // Сохраняем ответ (гарантируем что answerValue не null)
        const newAnswers: TestAnswer[] = [
            ...answers,
            { 
                questionId: currentQuestion.id, 
                answer: answerValue as string | string[]
            }
        ];
        setAnswers(newAnswers);

        if (isLastQuestion) {
            // Вычисляем результат и перенаправляем на страницу результатов
            const result = calculateTestResult(newAnswers);
            router.push(`/test/results?indices=${result.productIndices.join(',')}`);
        } else {
            // Переходим к следующему вопросу
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setSelectedAnswers([]);
        }
    };

    if (!testStarted) {
        return (
            <main className="bg-white">
                <div className="max-w-[1440px] mx-auto px-2 md:px-4 xl:px-4 py-8 xl:py-2">
                    
                    {/* Баннер */}
                    <div className="relative w-full max-w-[377px] md:max-w-[992px] xl:max-w-[1400px] mx-auto rounded-[24px] md:rounded-[32px] xl:rounded-[40px] overflow-hidden h-[519px] md:h-[869px] xl:h-[726px]">
                        {/* Задний фон */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/test/background_test.svg"
                                alt="Background"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Контент баннера */}
                        <div className="relative z-10 px-4 md:px-10 xl:px-16 py-6 md:py-12 xl:py-16 h-full flex flex-col justify-center">
                            
                            <div className="max-w-[600px]">
                                {/* Бейджи */}
                                <div className="flex flex-wrap gap-2 md:gap-2 mb-4 md:mb-8 xl:mb-10">
                                    <span className="px-1.5 md:px-2 xl:px-2 py-1 md:py-1 rounded-full border border-black text-[8px] md:text-[12px] xl:text-[14px] font-medium font-montserrat bg-none backdrop-blur-sm">
                                        cruelty-free
                                    </span>
                                    <span className="px-1.5 md:px-2 xl:px-2 py-1 md:py-1 rounded-full border border-black text-[8px] md:text-[12px] xl:text-[14px] font-medium font-montserrat bg-none backdrop-blur-sm">
                                        vegan
                                    </span>
                                    <span className="px-1.5 md:px-2 xl:px-2 py-1 md:py-1 rounded-full border border-black text-[8px] md:text-[12px] xl:text-[14px] font-medium font-montserrat bg-none backdrop-blur-sm">
                                        zero-waste
                                    </span>
                                </div>

                                {/* Заголовок */}
                                <h1 className="text-[18px] md:text-[48px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-1 md:mb-2">
                                    НАЙДИ СВОЙ<br />ИДЕАЛЬНЫЙ УХОД
                                </h1>
                                
                                {/* Описание */}
                                <p className="text-[8px] md:text-[16px] xl:text-[18px] text-black font-montserrat leading-relaxed mb-4 md:mb-8">
                                    Мы подберем средства под твою кожу, рутину и ценности
                                </p>

                                {/* Звездочка и кнопка */}
                                <div className="flex items-center gap-1 md:gap-2">
                                    {/* SVG звездочка слева от кнопки */}
                                    <div className="w-5 h-5 md:w-8 md:h-8 xl:w-10 xl:h-10 flex-shrink-0">
                                        <Image
                                            src="/test/star_test.svg"
                                            alt="Star"
                                            width={40}
                                            height={40}
                                            className="w-full h-full"
                                        />
                                    </div>

                                    {/* Кнопка */}
                                    <button
                                        onClick={() => setTestStarted(true)}
                                        className="inline-flex items-center gap-2 border-1 border-brand-purple text-brand-purple rounded-full px-2 md:px-3 xl:px-4 py-2 md:py-3 text-[12px] md:text-[14px] xl:text-[16px] font-medium font-montserrat uppercase tracking-wide hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
                            >
                                        <span>ПРОЙТИ ТЕСТ</span>
                                        <svg 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 16 16" 
                                            fill="none" 
                                            className="w-3 h-3 md:w-4 md:h-4"
                                        >
                                            <path 
                                                d="M4 12L12 4M12 4H6M12 4V10" 
                                                stroke="currentColor" 
                                                strokeWidth="1.5" 
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Цветок (под текстом, но над YOUR MATCH на мобиле) */}
                        <div className="absolute -right-[250px] md:-right-[290px] xl:right-0 bottom-0 w-[479px] md:w-[758px] xl:w-[600px] h-[501px] md:h-[730px] xl:h-[600px] z-[5] md:z-20 pointer-events-none">
                            <Image
                                src="/test/3DGlassFlowers_test.png"
                                alt="Flower decoration"
                                fill
                                className="object-cover object-bottom md:object-contain"
                            />
                        </div>

                        {/* Текст "YOUR MATCH" справа снизу */}
                        <div className="absolute right-4 md:right-10 xl:right-16 bottom-4 md:bottom-10 xl:bottom-16 z-[3] w-[120px] md:w-[350px] xl:w-[450px] h-[80px] md:h-[180px] xl:h-[240px]">
                            <p className="absolute top-0 right-0 text-[32px] md:text-[72px] xl:text-[96px] font-tan-pearl text-black leading-none uppercase">
                                YOUR
                            </p>
                            <p className="absolute bottom-0 right-5 text-[32px] md:text-[72px] xl:text-[96px] font-tan-pearl text-black leading-none uppercase">
                                MATCH
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        );
    }

    // Здесь будет логика вопросов теста
    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 xl:px-10 py-8 xl:py-2">
                
                {/* Блок с вопросом */}
                <div className="relative w-full max-w-[377px] md:max-w-[992px] xl:max-w-[1400px] mx-auto rounded-[24px] md:rounded-[32px] xl:rounded-[40px] overflow-hidden">
                    
                    {/* Задний фон */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/test/background_test.svg"
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    

                    {/* Левый цветок */}
                    <div className="absolute left-0 top-0 w-full h-full z-10 pointer-events-none">
                        <Image
                            src="/test/left_flower_iphone.png"
                            alt="Left flower decoration"
                            fill
                            className="object-cover md:hidden"
                        />
                        <Image
                            src="/test/left_flower_ipad.png"
                            alt="Left flower decoration"
                            fill
                            className="object-cover hidden md:block xl:hidden"
                        />
                        <Image
                            src="/test/left_flower.svg"
                            alt="Left flower decoration"
                            fill
                            className="object-cover hidden xl:block"
                        />
                    </div>

                    {/* Правый цветок */}
                    <div className="absolute right-0 bottom-0 w-full h-full z-10 pointer-events-none">
                        <Image
                            src="/test/right_flower_iphone.png"
                            alt="Right flower decoration"
                            fill
                            className="object-contain object-bottom-right md:hidden"
                        />
                        <Image
                            src="/test/right_flower_ipad.png"
                            alt="Right flower decoration"
                            fill
                            className="object-contain object-bottom-right hidden md:block xl:hidden"
                        />
                        <Image
                            src="/test/right_flower.svg"
                            alt="Right flower decoration"
                            fill
                            className="object-contain object-bottom-right hidden xl:block"
                        />
                    </div>
                    {/* Блюр слой */}
                    <div className="absolute inset-0 z-11 backdrop-blur-[2px] bg-white/5" />
                    
                    {/* Контент вопроса */}
                    <div className="relative z-20 px-6 md:px-10 xl:px-16 py-8 md:py-12 xl:py-5 h-[519px] md:h-[869px] xl:h-[726px] flex flex-col">
                        
                        {/* Счетчик вопросов сверху */}
                        <div className="flex justify-center mb-8 md:mb-12">
                            <div className="bg-white/80 backdrop-blur-sm  rounded-full px-3 md:px-8 xl:px-3 py-1 md:py-1.3">
                                <p className="text-[8px] md:text-[14px] xl:text-[16px] font-montserrat text-black uppercase tracking-widest">
                                    ВОПРОС {currentQuestionIndex + 1} ИЗ {testQuestions.length}
                                </p>
                            </div>
                        </div>

                        {/* Центральная часть с вопросом и ответами */}
                        <div className="flex-1 flex flex-col items-center justify-center">
                            {/* Заголовок вопроса */}
                            <h2 className="text-[24px] md:text-[36px] xl:text-[50px] font-montserrat font-medium text-black uppercase text-center leading-tight mb-8 md:mb-12 xl:mb-16 max-w-[985px]">
                                {currentQuestion.question}
                            </h2>

                            {/* Варианты ответов (сетка 2x2) */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4 xl:gap-5 w-full max-w-[700px] mb-8 md:mb-12">
                                {currentQuestion.options.map((option) => {
                                    const isSelected = isMultipleChoice 
                                        ? selectedAnswers.includes(option)
                                        : selectedAnswer === option;
                                    
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswerSelect(option)}
                                            className={`backdrop-blur-sm  rounded-full px-6 md:px-8 xl:px-8 py-3 md:py-4 xl:py-4 text-[8px] md:text-[14px] xl:text-[16px] font-regular font-montserrat uppercase transition-all text-left ${
                                                isSelected
                                                    ? 'bg-brand-purple text-white '
                                                    : 'bg-white/80 text-black border-black/10 hover:bg-brand-purple hover:text-white '
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Кнопка "Следующий вопрос" */}
                            <button
                                onClick={handleNextQuestion}
                                disabled={isMultipleChoice ? selectedAnswers.length === 0 : !selectedAnswer}
                                className={`inline-flex items-center gap-2 rounded-full px-4 md:px-10 xl:px-5 py-3 md:py-4 text-[8px] md:text-[14px] xl:text-[14px] font-regular font-montserrat uppercase tracking-wide transition-all ${
                                    (isMultipleChoice ? selectedAnswers.length > 0 : selectedAnswer)
                                        ? 'bg-brand-purple text-white hover:opacity-90'
                                        : 'bg-brand-purple text-white cursor-not-allowed'
                                }`}
                            >
                                <span>{isLastQuestion ? 'ПОКАЗАТЬ РЕЗУЛЬТАТЫ' : 'СЛЕДУЮЩИЙ ВОПРОС'}</span>
                                <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 16 16" 
                                    fill="none" 
                                    className="w-3 h-3 md:w-4 md:h-4"
                                >
                                    <path 
                                        d="M4 8H12M12 8L8 4M12 8L8 12" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
