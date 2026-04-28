"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const WATCH_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1500&q=80",
  "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1500&q=80",
  "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1500&q=80",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1500&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1500&q=80",
  "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=1500&q=80",
  "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=1500&q=80",
  "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=1500&q=80",
];

function normalizeListingImage(image: string) {
  if (!image || !image.includes("images.unsplash.com")) {
    return image;
  }

  if (/([?&])w=\d+/i.test(image)) {
    return image.replace(/([?&])w=\d+/i, "$1w=1500");
  }

  return `${image}${image.includes("?") ? "&" : "?"}w=1500`;
}

function getListingImages(images: string[]) {
  const uniqueImages = Array.from(new Set(images.filter(Boolean).map(normalizeListingImage)));

  if (uniqueImages.length >= 5) {
    return uniqueImages.slice(0, 5);
  }

  for (const fallbackImage of WATCH_FALLBACK_IMAGES) {
    if (!uniqueImages.includes(fallbackImage)) {
      uniqueImages.push(fallbackImage);
    }
    if (uniqueImages.length === 5) {
      break;
    }
  }

  return uniqueImages;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const listingImages = getListingImages(product.images);
  const mainImage = listingImages[selectedImageIndex] || listingImages[0] || "";

  const isOutOfStock = product.stock === 0;

  const priceDisplay = product.price.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const compareAtPriceDisplay = (product.price * 1.38).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  function addCurrentItemToCart() {
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: mainImage,
    });
  }

  function handleQuickBuy(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    addCurrentItemToCart();
    router.push("/checkout");
  }

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    addCurrentItemToCart();
    setIsCartOpen(true);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d6dbe3] bg-[#f4f6fa] p-3 shadow-[0_8px_25px_rgba(15,23,42,0.09)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.14)]"
    >
      <div className="relative overflow-hidden rounded-[18px] border border-[#d8dce4] bg-white">
        {!isOutOfStock && (
          <span className="absolute left-0 top-0 z-20 rounded-br-xl rounded-tl-md bg-gradient-to-r from-[#56afff] to-[#b22dff] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            27% Off
          </span>
        )}

        <button
          type="button"
          aria-label="Add to favorites"
          className="absolute right-2 top-2 z-20 rounded-b-md bg-white px-3 py-1.5 text-yellow-500 shadow-sm transition hover:text-yellow-600"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>

        <div className="relative aspect-square overflow-hidden">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {isOutOfStock && (
            <span className="absolute left-3 top-3 z-20 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-black">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <h3 className="line-clamp-1 text-center text-[18px] font-medium leading-tight text-[#1a1a1a]">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-center text-[14px] font-medium text-[#767a85]">
          {product.category}
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-col">
            <span className="text-[20px] font-semibold leading-none tracking-tight text-[#111] sm:text-[22px]">Rs.{priceDisplay}</span>
            <span className="mt-1.5 text-[13px] font-medium text-[#9a9eab] line-through sm:text-[14px]">Rs.{compareAtPriceDisplay}</span>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full whitespace-nowrap rounded-md px-2 py-2 text-[11px] font-medium transition sm:px-4 sm:text-[14px] ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500"
                  : "border border-[#111] bg-white text-[#111] hover:bg-gray-100"
              }`}
            >
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
            <button
              type="button"
              onClick={handleQuickBuy}
              disabled={isOutOfStock}
              className={`w-full whitespace-nowrap rounded-md px-2 py-2 text-[11px] font-medium transition sm:px-4 sm:text-[14px] ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isOutOfStock ? "Sold Out" : "Buy Now"}
            </button>
          </div>
        </div>

        {listingImages.length > 0 && (
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
            {listingImages.map((image, index) => {
              const isActive = selectedImageIndex === index;

              return (
                <button
                  key={`${product._id}-${index}`}
                  type="button"
                  className={`h-9 w-9 overflow-hidden bg-white transition sm:h-10 sm:w-10 ${
                    isActive ? "border-2 border-black p-[1px]" : "border border-gray-200 hover:border-black"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedImageIndex(index);
                  }}
                  aria-label={`View ${product.name} image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
