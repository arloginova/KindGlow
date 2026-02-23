import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
    weight: ['400', '500', '600', '700']
});

const tanPearl = localFont({
    src: "../../public/fonts/tan-pearl.otf",
    variable: "--font-tan-pearl",
});

export const metadata: Metadata = {
    title: "KindGlow | Косметика и уход",
    description: "Дипломный проект о качественной косметике",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${montserrat.variable} ${tanPearl.variable} antialiased min-h-screen flex flex-col`}>
                <Header />
                <main className="flex-grow mb-8 md:mb-[60px] xl:mb-[76px]">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
