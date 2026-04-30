import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { YandexMetrika } from "@/components/Analytics/YandexMetrika";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const kudryashev = localFont({
    src: "../../public/fonts/kudryashev-display.ttf",
    variable: "--font-kudryashev-display",
    display: "swap",
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
            <body className={`${montserrat.variable} ${kudryashev.variable} antialiased min-h-screen flex flex-col`}>
                <Header />
                <main className="grow mb-0.25 lg:mb-0">
                    {children}
                </main>
                <Footer />
                <YandexMetrika />
            </body>
        </html>
    );
}
