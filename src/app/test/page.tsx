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
                <div className="max-w-[1440px] mx-auto px-2 lg:px-4 xl:px-5 mt-7 lg:mt-4 xl:mt-2 mb-7.75 lg:mb-15 xl:mb-19">
                    
                    {/* Баннер */}
                    <div className="relative w-full mx-auto rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden h-[519px] lg:h-[869px] xl:h-[726px]">
                        {/* Задний фон */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/test/background_test.png"
                                alt="Background"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Контент баннера */}
                        <div className="relative z-10 px-3 lg:px-4 xl:px-5 pt-49.5 lg:pt-80 xl:pt-52">
                            
                            <div className="max-w-[600px]">
                                {/* Бейджи */}
                                <div className="flex flex-wrap gap-1 lg:gap-2 mb-2.75 lg:mb-6 xl:mb-9">
                                    <span className="h-[14px] lg:h-[26px] xl:h-[32px] px-1 lg:px-1.5 xl:px-2 rounded-full border-[0.5px] lg:border border-black text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat lg:leading-6 xl:leading-8">
                                        cruelty-free
                                    </span>
                                    <span className="h-[14px] lg:h-[26px] xl:h-[32px] px-1 lg:px-1.5 xl:px-2 rounded-full border-[0.5px] lg:border border-black text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat lg:leading-6 xl:leading-8">
                                        vegan
                                    </span>
                                    <span className="h-[14px] lg:h-[26px] xl:h-[32px] px-1 lg:px-1.5 xl:px-2 rounded-full border-[0.5px] lg:border border-black text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat lg:leading-6 xl:leading-8">
                                        zero-waste
                                    </span>
                                </div>

                                {/* Заголовок */}
                                <h1 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-5.5 lg:leading-10.75 xl:leading-15.25 mb-1 lg:mb-2.5 xl:mb-2.25">
                                    НАЙДИ СВОЙ<br />ИДЕАЛЬНЫЙ УХОД
                                </h1>
                                
                                {/* Описание */}
                                <p className="text-[10px] lg:text-[12px] xl:text-[16px] text-black font-montserrat leading-relaxed mb-2.75 lg:mb-4.5 xl:mb-6.25">
                                    Мы подберём средства под твою кожу, рутину и ценности
                                </p>

                                {/* Звездочка и кнопка */}
                                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                                    {/* SVG звездочка слева от кнопки */}
                                    <div className="w-3.5 h-3.5 lg:w-5.75 lg:h-5.75 xl:w-8.25 xl:h-8.25 flex-shrink-0">
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
                                        className="shrink-0 inline-flex items-center whitespace-nowrap leading-none gap-1.75 lg:gap-2 xl:gap-3 border border-brand-purple/50 lg:border-brand-purple text-brand-purple rounded-full px-1.75 lg:px-3.25 xl:px-4 py-1.75 lg:py-3.25 xl:py-4.25 text-[8px] lg:text-[13px] xl:text-[16px] font-montserrat uppercase hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all cursor-pointer"
                            >
                                        <span>ПРОЙТИ ТЕСТ</span>

                                        <svg width="5" height="5" viewBox="0 0 5 5" fill="none" className="w-1.25 lg:w-1.75 xl:w-2.25 h-1.25 lg:h-1.75 xl:h-2.25">
                                            <path d="M0.248057 0.24999H4.20507M4.20507 0.24999V4.207M4.20507 0.24999L0.248057 4.207" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Цветок (под текстом, но над YOUR MATCH на мобиле) */}
                        <div className="absolute -right-[250px] lg:-right-[165px] xl:right-5 bottom-0 w-[479px] lg:w-[758px] xl:w-[680px] h-[501px] lg:h-[789px] xl:h-[706px] z-[5] md:z-20 pointer-events-none">
                            <Image
                                src="/test/3DGlassFlowers_test.png"
                                alt="Flower decoration"
                                fill
                                className="object-cover object-bottom md:object-contain"
                            />
                        </div>

                        {/* Текст "YOUR MATCH" справа снизу */}
                        <div className="hidden lg:block absolute right-4 sm:right-6 md:right-10 xl:right-16 bottom-4 sm:bottom-6 md:bottom-10 xl:bottom-16 z-[3] w-[120px] sm:w-[235px] md:w-[350px] xl:w-[450px] h-[80px] sm:h-[130px] md:h-[180px] xl:h-[240px]">
                            <p className="absolute -top-0.25 lg:top-3 -right-0.75 lg:-right-5.75 text-[100px] xl:text-[140px] font-display text-black leading-none uppercase">
                                Твой
                            </p>
                            <p className="absolute -bottom-6.75 lg:-bottom-12.75 right-6.5 lg:right-4.25 text-[100px] xl:text-[140px] font-display text-black leading-none uppercase">
                                Выбор
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
            <div className="max-w-[1440px] mx-auto px-2 lg:px-3 xl:px-5 pt-7 lg:pt-4 xl:pt-2 pb-7.75 lg:pb-15 xl:pb-19">
                
                {/* Блок с вопросом */}
                <div className="relative flex justify-center w-full mx-auto rounded-[16px] lg:rounded-[20px] xl:rounded-[30px] overflow-hidden">
                    
                    {/* Задний фон */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/test/background_test.png"
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
                    <div className="relative max-w-[377px] lg:max-w-[992px] xl:max-w-[1400px] z-20 px-3 lg:px-30 xl:px-16 py-3 lg:py-5 xl:py-5 h-[519px] lg:h-[869px] xl:h-[726px] flex flex-col">
                        
                        {/* Счетчик вопросов сверху */}
                        <div className="flex justify-center">
                            <div className="bg-white rounded-full px-1 lg:px-1.75 xl:px-2.5 py-0.25 lg:py-1">
                                <p className="text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat text-black uppercase">
                                    ВОПРОС {currentQuestionIndex + 1} ИЗ {testQuestions.length}
                                </p>
                            </div>
                        </div>

                        {/* Центральная часть с вопросом и ответами */}
                        <div className="flex-1 flex flex-col items-center">
                            {/* Заголовок вопроса */}
                            <h2 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase text-center pt-28.75 lg:pt-50.5 xl:pt-39.25 leading-5.5 lg:leading-10.75 xl:leading-15.25 mb-5 xl:mb-6.5 max-w-[985px]">
                                {currentQuestion.question}
                            </h2>

                            {/* Варианты ответов (сетка 2x2) */}
                            <div className="grid grid-cols-2 gap-2 lg:gap-4.25 xl:gap-5 w-full max-w-[580px] xl:max-w-[762px] mb-4 lg:mb-9.5 xl:mb-10">
                                {currentQuestion.options.map((option) => {
                                    const isSelected = isMultipleChoice 
                                        ? selectedAnswers.includes(option)
                                        : selectedAnswer === option;
                                    
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswerSelect(option)}
                                            className={`rounded-full px-2.5 lg:px-3 xl:px-4 py-2.5 lg:py-3.75 xl:py-4.5 text-[8px] lg:text-[12px] xl:text-[16px] font-regular font-montserrat uppercase transition-all text-left cursor-pointer ${
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
                                className={`inline-flex items-center gap-0.5 bg-brand-purple text-white rounded-full pl-2 lg:pl-2.75 xl:pl-4.5 pr-1.5 lg:pr-1.75 xl:pr-2.25 py-1.75 lg:py-2.75 xl:py-3.5 text-[8px] lg:text-[10px] xl:text-[14px] font-regular font-montserrat uppercase hover:opacity-90 transition-all flex-shrink-0 ${
                                    (isMultipleChoice ? selectedAnswers.length > 0 : selectedAnswer)
                                        ? 'bg-brand-purple text-white hover:opacity-90 cursor-pointer'
                                        : 'bg-brand-purple text-white cursor-not-allowed'
                                }`}
                            >
                                <span className="leading-none">{isLastQuestion ? 'ПОКАЗАТЬ РЕЗУЛЬТАТЫ' : 'СЛЕДУЮЩИЙ ВОПРОС'}</span>

                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-2.75 h-2.75 lg:w-4 lg:h-4 xl:w-5 xl:h-5">
                                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
