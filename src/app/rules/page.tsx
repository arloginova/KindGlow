const rules = [
    'Общаемся бережно и уважительно, без обесценивания чужого опыта.',
    'Не выдаём личный опыт за медицинскую рекомендацию.',
    'Не публикуем агрессивную рекламу и сомнительные обещания мгновенного результата.',
    'При обсуждении средств учитываем индивидуальные реакции кожи и возможные противопоказания.',
    'Сохраняем фокус на осознанном уходе, этичном выборе и честном разговоре о косметике.',
];

export default function RulesPage() {
    return (
        <main className="bg-white">
            <div className="max-w-[1440px] mx-auto px-2 lg:px-4 xl:px-5 py-6.25 lg:py-10 xl:py-12.5">
                <h1 className="text-[18px] lg:text-[35px] xl:text-[50px] font-montserrat font-medium text-black uppercase mb-4 lg:mb-6 xl:mb-8">
                    Правила сообщества
                </h1>

                <p className="max-w-[820px] text-[12px] lg:text-[15px] xl:text-[18px] font-montserrat leading-relaxed text-black/75 mb-6 lg:mb-9 xl:mb-12">
                    KindGlow — пространство про спокойный, осознанный и доброжелательный разговор о косметике.
                    Эти правила помогают сохранять обсуждение полезным и безопасным.
                </p>

                <ol className="grid gap-2.5 lg:gap-4 xl:gap-5 max-w-[920px]">
                    {rules.map((rule, index) => (
                        <li
                            key={rule}
                            className="flex gap-3 lg:gap-5 border border-black/15 rounded-[16px] lg:rounded-[20px] p-4 lg:p-6 xl:p-7"
                        >
                            <span className="text-[12px] lg:text-[16px] xl:text-[20px] font-montserrat font-medium text-brand-purple shrink-0">
                                /{String(index + 1).padStart(2, '0')}
                            </span>
                            <p className="text-[12px] lg:text-[15px] xl:text-[18px] font-montserrat leading-relaxed text-black/75">
                                {rule}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    );
}
