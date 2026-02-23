import { HeroBanner } from '@/components/Home/HeroBanner';
import { ProductsSection } from '@/components/Home/ProductsSection';
import { VideosSection } from '@/components/Home/VideosSection';
import { TestSection } from '@/components/Home/TestSection';
import { ArticlesSection } from '@/components/Home/ArticlesSection';
import { TelegramSection } from '@/components/Home/TelegramSection';

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* Контейнер с отступами */}
            <div className="max-w-[1440px] mx-auto px-2 md:px-4 xl:px-5">
                
                {/* Hero Баннер */}
                <HeroBanner />

                {/* Наши находки */}
                <ProductsSection />

                {/* Уроки и обзоры */}
                <VideosSection />

                {/* Тест */}
                <TestSection />

                {/* Статьи */}
                <ArticlesSection />

                {/* Telegram чат */}
                <TelegramSection />

            </div>
        </main>
    );
}
