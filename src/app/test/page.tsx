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
                                    <span className="h-[14px] lg:h-[26px] xl:h-[32px] px-1 lg:px-1.5 xl:px-2 rounded-full border-[0.5px] lg:border-[0.7px] border-black text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat lg:leading-6 xl:leading-8">
                                        cruelty-free
                                    </span>
                                    <span className="h-[14px] lg:h-[26px] xl:h-[32px] px-1 lg:px-1.5 xl:px-2 rounded-full border-[0.5px] lg:border-[0.7px] border-black text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat lg:leading-6 xl:leading-8">
                                        vegan
                                    </span>
                                    <span className="h-[14px] lg:h-[26px] xl:h-[32px] px-1 lg:px-1.5 xl:px-2 rounded-full border-[0.5px] lg:border-[0.7px] border-black text-[8px] lg:text-[12px] xl:text-[16px] font-montserrat lg:leading-6 xl:leading-8">
                                        zero-waste
                                    </span>
                                </div>

                                {/* Заголовок */}
                                <h1 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase leading-5.5 lg:leading-10.75 xl:leading-15.25 mb-1 lg:mb-2.5 xl:mb-2.25">
                                    НАЙДИ СВОЙ<br />ИДЕАЛЬНЫЙ УХОД
                                </h1>
                                
                                {/* Описание */}
                                <p className="text-[8px] lg:text-[12px] xl:text-[16px] text-black font-montserrat leading-relaxed mb-2.75 lg:mb-4.5 xl:mb-6.25">
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
                                        className="inline-flex items-center gap-1.75 lg:gap-2 xl:gap-3 border-[0.5px] lg:border-[0.7px] lx:border-1 border-brand-purple text-brand-purple rounded-full px-1.75 lg:px-3.25 xl:px-4 py-1.75 lg:py-3.25 xl:py-4.25 text-[8px] lg:text-[13px] xl:text-[16px] font-montserrat uppercase hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all"
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
                                            className={`rounded-full px-2.5 lg:px-3 xl:px-4 py-2.5 lg:py-3.75 xl:py-4.5 text-[8px] lg:text-[12px] xl:text-[16px] font-regular font-montserrat uppercase transition-all text-left ${
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
                                className={`inline-flex items-center gap-2 bg-brand-purple text-white rounded-full pl-2 lg:pl-2.75 xl:pl-4.5 pr-1.5 lg:pr-1.75 xl:pr-2.25 py-1.75 lg:py-2.75 xl:py-3.5 text-[8px] lg:text-[10px] xl:text-[14px] font-regular font-montserrat uppercase hover:opacity-90 transition-all flex-shrink-0 ${
                                    (isMultipleChoice ? selectedAnswers.length > 0 : selectedAnswer)
                                        ? 'bg-brand-purple text-white hover:opacity-90'
                                        : 'bg-brand-purple text-white cursor-not-allowed'
                                }`}
                            >
                                <span>{isLastQuestion ? 'ПОКАЗАТЬ РЕЗУЛЬТАТЫ' : 'СЛЕДУЮЩИЙ ВОПРОС'}</span>

                                <svg width="4" height="7" viewBox="0 0 4 7" fill="none" className="w-1.75 h-1.75">
                                    <path d="M0.107493 0.590191C0.0731562 0.556795 0.0463127 0.517511 0.0284948 0.474582C0.0106769 0.431652 0.00223355 0.385917 0.00364722 0.339988C0.00506089 0.294059 0.0163037 0.248836 0.0367337 0.206901C0.0571637 0.164965 0.0863809 0.127139 0.122717 0.0955811C0.159053 0.0640233 0.201797 0.0393522 0.248507 0.0229763C0.295217 0.00660052 0.344979 -0.00115934 0.394953 0.000139919C0.444926 0.00143918 0.494132 0.0117721 0.53976 0.0305486C0.585388 0.0493251 0.626546 0.0761776 0.660883 0.109573L3.89597 3.25773C3.96278 3.32267 4 3.40866 4 3.49803C4 3.58741 3.96278 3.6734 3.89597 3.73834L0.660883 6.88685C0.626773 6.92097 0.585624 6.94853 0.539828 6.96792C0.494032 6.9873 0.444501 6.99813 0.394112 6.99978C0.343723 7.00142 0.29348 6.99385 0.246302 6.9775C0.199125 6.96115 0.155952 6.93635 0.119293 6.90453C0.0826333 6.87271 0.0532175 6.83452 0.0327542 6.79217C0.0122909 6.74982 0.00118783 6.70415 9.00115e-05 6.65782C-0.00100781 6.61149 0.00792141 6.56542 0.0263591 6.52229C0.0447968 6.47916 0.0723755 6.43983 0.107493 6.40658L3.09595 3.49803L0.107493 0.590191Z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
