'use client';

import { useState } from 'react';
import Image from 'next/image';
import { testQuestions } from '@/data/testQuestions';
import { calculateTestResult } from '@/data/testLogic';
import { TestAnswer } from '@/types/test';

export default function TestPage() {
    const [testStarted, setTestStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<TestAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = testQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        if (!selectedAnswer) return;

        // Сохраняем ответ
        const newAnswers = [
            ...answers,
            { questionId: currentQuestion.id, answer: selectedAnswer }
        ];
        setAnswers(newAnswers);

        if (isLastQuestion) {
            // Показываем результаты
            setShowResults(true);
        } else {
            // Переходим к следующему вопросу
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    if (showResults) {
        const result = calculateTestResult(answers);
        
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8 lg:py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-montserrat font-bold mb-4">Результаты теста</h1>
                        <p className="text-xl mb-4">Вариант {result.variant}</p>
                        <p className="text-lg">Рекомендуемые продукты: {result.productIds.join(', ')}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!testStarted) {
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8 lg:py-12">
                    
                    {/* Баннер */}
                    <div className="relative w-full max-w-[377px] md:max-w-[992px] lg:max-w-[1400px] mx-auto rounded-[24px] md:rounded-[32px] lg:rounded-[40px] overflow-hidden">
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
                        <div className="relative z-10 px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16 h-[519px] md:h-[869px] lg:h-[726px] flex flex-col justify-between">
                            
                            {/* Верхняя часть: бейджи */}
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                <span className="px-3 md:px-4 lg:px-5 py-1 md:py-1.5 rounded-full border border-black text-[10px] md:text-[12px] lg:text-[14px] font-medium font-montserrat bg-none backdrop-blur-sm">
                                    cruelty-free
                                </span>
                                <span className="px-3 md:px-4 lg:px-5 py-1 md:py-1.5 rounded-full border border-black text-[10px] md:text-[12px] lg:text-[14px] font-medium font-montserrat bg-none backdrop-blur-sm">
                                    vegan
                                </span>
                                <span className="px-3 md:px-4 lg:px-5 py-1 md:py-1.5 rounded-full border border-black text-[10px] md:text-[12px] lg:text-[14px] font-medium font-montserrat bg-none backdrop-blur-sm">
                                    zero-waste
                                </span>
                            </div>

                            {/* Средняя часть: заголовок и описание */}
                            <div className="max-w-[600px]">
                                <h1 className="text-[32px] md:text-[48px] lg:text-[50px] font-montserrat font-medium text-black uppercase leading-tight mb-4 md:mb-6">
                                    НАЙДИ СВОЙ<br />ИДЕАЛЬНЫЙ УХОД
                                </h1>
                                <p className="text-[14px] md:text-[16px] lg:text-[18px] text-black font-montserrat leading-relaxed mb-6 md:mb-8">
                                    Мы подберем средства под твою кожу, рутину и ценности
                                </p>

                                {/* Звездочка и кнопка */}
                                <div className="flex items-center gap-3 md:gap-4">
                                    {/* SVG звездочка слева от кнопки */}
                                    <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 flex-shrink-0">
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
                                        className="inline-flex items-center gap-2 bg-none border border-black rounded-full px-6 md:px-8 lg:px-10 py-3 md:py-4 text-[12px] md:text-[14px] lg:text-[16px] font-medium font-montserrat uppercase tracking-wide hover:bg-black hover:text-white transition-all"
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
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Цветок (НАД текстом справа, прилипает к низу) */}
                        <div className="absolute right-0 bottom-0 w-[300px] md:w-[450px] lg:w-[600px] h-[300px] md:h-[450px] lg:h-[600px] z-20 pointer-events-none">
                            <Image
                                src="/test/3DGlassFlowers_test.png"
                                alt="Flower decoration"
                                fill
                                className="object-contain object-bottom"
                            />
                        </div>

                        {/* Текст "YOUR MATCH" справа снизу */}
                        <div className="absolute right-6 md:right-10 lg:right-16 bottom-6 md:bottom-10 lg:bottom-16 z-10">
                            <p className="text-[48px] md:text-[72px] lg:text-[96px] font-tan-pearl text-black leading-none uppercase">
                                YOUR<br />MATCH
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        );
    }

    // Здесь будет логика вопросов теста
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8 lg:py-12">
                
                {/* Блок с вопросом */}
                <div className="relative w-full max-w-[377px] md:max-w-[992px] lg:max-w-[1400px] mx-auto rounded-[24px] md:rounded-[32px] lg:rounded-[40px] overflow-hidden">
                    
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
                            src="/test/left_flower.svg"
                            alt="Left flower decoration"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Правый цветок */}
                    <div className="absolute right-0 bottom-0 w-full h-full z-10 pointer-events-none">
                        <Image
                            src="/test/right_flower.svg"
                            alt="Right flower decoration"
                            fill
                            className="object-contain object-bottom-right"
                        />
                    </div>
                    {/* Блюр слой */}
                    <div className="absolute inset-0 z-11 backdrop-blur-[2px] bg-white/5" />
                    
                    {/* Контент вопроса */}
                    <div className="relative z-20 px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-16 h-[519px] md:h-[869px] lg:h-[726px] flex flex-col items-center justify-center">
                        
                        {/* Счетчик вопросов */}
                        <p className="text-[12px] md:text-[14px] lg:text-[16px] font-montserrat text-black uppercase tracking-widest mb-8 md:mb-12">
                            ВОПРОС {currentQuestionIndex + 1} ИЗ {testQuestions.length}
                        </p>

                        {/* Заголовок вопроса */}
                        <h2 className="text-[24px] md:text-[36px] lg:text-[50px] font-montserrat font-medium text-black uppercase text-center leading-tight mb-8 md:mb-12 lg:mb-16 max-w-[900px]">
                            {currentQuestion.question}
                        </h2>

                        {/* Варианты ответов (сетка 2x2) */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5 w-full max-w-[700px] mb-8 md:mb-12">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`backdrop-blur-sm border rounded-full px-6 md:px-8 lg:px-10 py-2 md:py-4 lg:py-4 text-[12px] md:text-[14px] lg:text-[16px] font-medium font-montserrat uppercase transition-all text-left ${
                                        selectedAnswer === option
                                            ? 'bg-brand-purple text-white border-brand-purple'
                                            : 'bg-white/80 text-black border-black/10 hover:bg-brand-purple hover:text-white hover:border-brand-purple'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Кнопка "Следующий вопрос" */}
                        <button
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer}
                            className={`inline-flex items-center gap-2 rounded-full px-8 md:px-10 lg:px-6 py-3 md:py-4 text-[12px] md:text-[14px] lg:text-[14px] font-medium font-montserrat uppercase tracking-wide transition-all ${
                                selectedAnswer
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
        </main>
    );
}
