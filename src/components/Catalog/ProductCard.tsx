import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
    isTallLg?: boolean;
    isTallSm?: boolean;
}

export const ProductCard = ({ product, isTallLg = false, isTallSm = false }: ProductCardProps) => {
    // Для сетки всегда используем "маленькие" изображения (images), как просил юзер.
    // Если изображение прямоугольное, оно просто займет 2 ячейки по высоте.
    const desktopImg = product.images.desktop;
    const tabletImg = product.images.tablet;
    const mobileImg = product.images.mobile;

    return (
        <Link
            href={`/products/${product.id}`}
            className={`group relative block w-full overflow-hidden rounded-[24px] bg-[#F3F3F7] transition-all 
                ${isTallLg ? 'lg:aspect-[1/2.04]' : 'lg:aspect-square'}
                ${isTallSm ? 'aspect-[1/2.04]' : 'aspect-square'}`}
        >
            {/* Изображение - фоновое */}
            <div className="absolute inset-0 w-full h-full">
                {/* Desktop Image */}
                <div className="hidden xl:block relative w-full h-full">
                    <Image
                        src={desktopImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1440px) 33vw, 450px"
                    />
                </div>
                {/* Tablet Image */}
                <div className="hidden lg:block xl:hidden relative w-full h-full">
                    <Image
                        src={tabletImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 33vw, 320px"
                    />
                </div>
                {/* Mobile Image */}
                <div className="lg:hidden relative w-full h-full">
                    <Image
                        src={mobileImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 185px"
                    />
                </div>
            </div>

            {/* Контент поверх фото внизу */}
            <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 xl:p-5 z-10 flex flex-col">
                <div className="flex justify-between items-start gap-1 lg:gap-2 mb-0.5 lg:mb-1">
                    <h3 className="text-[8px] lg:text-[12px] xl:text-[16px] font-bold text-black uppercase leading-[1.2] font-montserrat">
                        {product.name}
                    </h3>
                    <span className="text-[8px] lg:text-[12px] xl:text-[16px] font-bold text-black whitespace-nowrap font-montserrat">
                        {product.price.toLocaleString()} Р
                    </span>
                </div>
                <p className="text-[8px] lg:text-[12px] xl:text-[15px] text-gray-800 font-normal font-montserrat max-w-[95%] leading-tight lg:leading-snug">
                    {product.description}
                </p>
            </div>
        </Link>
    );
};
