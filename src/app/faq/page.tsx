const faqItems = [
    {
        question: 'Как задать вопрос?',
        answer: 'Напишите нам в Telegram-канал KindGlow. Мы читаем сообщения и собираем самые частые темы для новых материалов.',
    },
    {
        question: 'Можно ли доверять подборкам средств?',
        answer: 'Подборки на сайте носят информационный характер. Перед покупкой ориентируйтесь на свой тип кожи, состав продукта и индивидуальную реакцию.',
    },
    {
        question: 'Как работает тест?',
        answer: 'Тест анализирует ответы и предлагает категории ухода, которые могут подойти под ваши привычки и состояние кожи.',
    },
    {
        question: 'Где смотреть уроки и обзоры?',
        answer: 'Все видео собраны в разделе "Уроки и обзоры". Там есть базовый макияж, тематические образы и тестирование находок.',
    },
];

export default function FaqPage() {
    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-2 lg:px-4 xl:px-5 py-6.25 lg:py-10 xl:py-12.5">
                <h1 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase mb-6 lg:mb-9 xl:mb-12">
                    Вопросы
                </h1>

                <div className="grid gap-2.5 lg:gap-4 xl:gap-5 max-w-[920px]">
                    {faqItems.map((item) => (
                        <article
                            key={item.question}
                            className="border border-black/15 rounded-[16px] lg:rounded-[20px] p-4 lg:p-6 xl:p-7"
                        >
                            <h2 className="text-[14px] lg:text-[20px] xl:text-[24px] font-montserrat font-medium text-black mb-2 lg:mb-3">
                                {item.question}
                            </h2>
                            <p className="text-[12px] lg:text-[15px] xl:text-[18px] font-montserrat leading-relaxed text-black/75">
                                {item.answer}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
