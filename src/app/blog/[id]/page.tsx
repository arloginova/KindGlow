'use client';

import { use, useEffect, useState } from 'react';
import { articles } from '@/data/articles';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const categoryLabels: Record<string, string> = {
    'об осознанности': 'ОБ ОСОЗНАННОСТИ',
    'бренды': 'БРЕНДЫ',
    'отечественный подход': 'ОТЕЧЕСТВЕННЫЙ ПОДХОД',
};

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const article = articles.find(a => a.id === id);

    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        if (!article) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        article.sections.forEach(section => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [article]);

    if (!article) return notFound();

    const scrollToSection = (sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const contentSections = parseContentToSections(article.content, article.sections);

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-10 py-8 lg:py-12">

                {/* Хлебные крошки */}
                <nav className="flex items-center gap-2 text-[12px] lg:text-[18px] uppercase tracking-widest mb-6 lg:mb-10 font-montserrat">
                    <Link href="/blog" className="text-black hover:text-black transition-colors">СТАТЬИ</Link>
                    <span className="text-black">&gt;</span>
                    <span className="text-black font-regular uppercase">{categoryLabels[article.category]}</span>
                </nav>

                {/* Основной layout: контент + сайдбар */}
                <div className="flex gap-12 md:gap-8 xl:gap-20 items-start">

                    {/* ── Левая колонка: контент ── */}
                    <article className="flex-1 min-w-0 max-w-[856px]">

                        {/* Бейджи */}
                        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                            {article.badges.map(badge => (
                                <span
                                    key={badge}
                                    className={`text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-regular font-montserrat leading-tight bg-white px-2 py-1 rounded-full border `}
                                >
                                    #{badge}
                                </span>
                            ))}
                        </div>

                        {/* Заголовок */}
                        <h1 className="text-[24px] md:text-[32px] lg:text-[40px] xl:text-[50px] font-montserrat font-semibold text-black uppercase leading-tight mb-2 md:mb-3">
                            {article.title}
                        </h1>

                        {/* Описание */}
                        <p className="text-[13px] md:text-[15px] lg:text-[16px] xl:text-[18px] text-black font-montserrat leading-relaxed mb-6 md:mb-8">
                            {article.description}
                        </p>

                        {/* Картинка для мобильного (только < md) */}
                        {article.squareImage && (
                            <div className="relative w-[185px] h-[111px] rounded-[16px] overflow-hidden mb-6 md:hidden">
                                <Image
                                    src={article.squareImageIphone ?? article.squareImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Текст статьи по секциям */}
                        <div>
                            {contentSections.map(({ sectionId, heading, body }) => (
                                <div key={sectionId} id={sectionId} className="mb-8 md:mb-10 scroll-mt-8">
                                    {heading && (
                                        <h2 className="text-[18px] md:text-[22px] lg:text-[26px] xl:text-[50px] font-montserrat font-medium text-black leading-tight mb-3 md:mb-4">
                                            {heading}
                                        </h2>
                                    )}
                                    <div
                                        className="text-[13px] md:text-[14px] lg:text-[15px] xl:text-[18px] text-black font-montserrat leading-tight  space-y-3"
                                        dangerouslySetInnerHTML={{ __html: markdownToHtml(body) }}
                                    />
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* ── Правая колонка: картинка + содержание (только md+) ── */}
                    <aside className="hidden md:flex flex-col gap-6 w-[320px] xl:w-[453px] flex-shrink-0 sticky top-8">

                        {/* Картинка статьи */}
                        {article.squareImage && (
                            <div className="relative w-full rounded-[16px] overflow-hidden shadow-sm aspect-[320/195] xl:aspect-[453/273]">
                                <Image
                                    src={article.squareImageIpad ?? article.squareImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover md:block xl:hidden"
                                />
                                <Image
                                    src={article.squareImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover hidden xl:block"
                                />
                            </div>
                        )}

                        {/* Содержание с фоном */}
                        <div className="relative w-full aspect-[320/254] xl:aspect-[453/296] rounded-[16px] overflow-hidden p-6 xl:p-10 flex flex-col justify-center shadow-sm">
                            {/* Фон */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/articles/background_content.svg"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Контент поверх фона */}
                            <div className="relative z-10 w-full">
                                <p className="text-[10px] md:text-[11px] font-semibold font-montserrat text-black uppercase tracking-widest mb-3 md:mb-4">
                                    СОДЕРЖАНИЕ
                                </p>
                                <nav className="flex flex-col gap-2">
                                    {article.sections.map(section => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`text-left text-[11px] md:text-[12px] xl:text-[16px] font-montserrat leading-snug transition-all duration-200 ${activeSection === section.id
                                                ? 'text-black font-semibold pl-2 border-l-2 border-black'
                                                : 'text-gray-600 hover:text-black hover:pl-1'
                                                }`}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

/* ─── Утилиты ─────────────────────────────────────────────────────── */

interface ContentSection {
    sectionId: string;
    heading: string;
    body: string;
}

function parseContentToSections(content: string, sections: { id: string; title: string }[]): ContentSection[] {
    if (!content.trim()) {
        return sections.map(s => ({ sectionId: s.id, heading: s.title, body: '' }));
    }

    const parts = content.split(/^## /m).filter(Boolean);
    const result: ContentSection[] = [];

    parts.forEach((part, index) => {
        const lines = part.split('\n');
        const heading = lines[0].trim();
        const body = lines.slice(1).join('\n').trim();
        const sectionId = sections[index]?.id ?? `section-${index}`;
        result.push({ sectionId, heading, body });
    });

    return result;
}

function markdownToHtml(md: string): string {
    // Жирный текст
    let html = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Курсив
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Нумерованные и маркированные списки → li
    html = html.replace(/^[\d]+\.\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/^[•\-]\s+(.+)$/gm, '<li>$1</li>');

    // Параграфы (разбиваем по двойному переносу)
    const paragraphs = html.split(/\n\n+/);
    const rendered = paragraphs.map(p => {
        const trimmed = p.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<li>')) {
            return `<ul class="list-disc pl-5 space-y-1 my-2">${trimmed}</ul>`;
        }
        return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    });

    return rendered.join('');
}
