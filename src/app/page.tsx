export default function Home() {
    return (
        <div className="container mx-auto px-4 py-12">
            <section className="text-center py-20 bg-pink-50 rounded-3xl mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Твоя кожа заслуживает <br /> лучшего ухода
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                    Мы собрали лучшие косметические средства в одном месте. Исследуй наш каталог и найди свой идеальный ритуал красоты.
                </p>
                <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all">
                    Перейти в каталог
                </button>
            </section>

            {/* Здесь будут блоки остальных страниц */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                    Блок Каталога (Превью)
                </div>
                <div className="h-64 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                    Блок Статей (Превью)
                </div>
            </div>
        </div>
    );
}
