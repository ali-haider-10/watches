"use client";

import { useState } from "react";
import { useOptionalProductImageSelection } from "@/contexts/ProductImageSelectionContext";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  showThumbnails?: boolean;
}

const WATCH_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1500&q=80",
  "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1500&q=80",
  "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1500&q=80",
  "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1500&q=80",
  "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1500&q=80",
  "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=1500&q=80",
];

function normalizeGalleryImage(image: string) {
  if (!image || !image.includes("images.unsplash.com")) {
    return image;
  }

  if (/([?&])w=\d+/i.test(image)) {
    return image.replace(/([?&])w=\d+/i, "$1w=1500");
  }

  return `${image}${image.includes("?") ? "&" : "?"}w=1500`;
}

function getGalleryImages(images: string[]) {
  const uniqueImages = Array.from(new Set(images.filter(Boolean).map(normalizeGalleryImage)));

  for (const fallbackImage of WATCH_FALLBACK_IMAGES) {
    if (uniqueImages.length >= 4) {
      break;
    }
    if (!uniqueImages.includes(fallbackImage)) {
      uniqueImages.push(fallbackImage);
    }
  }

  return uniqueImages.slice(0, 4);
}

export default function ProductImageGallery({
  images,
  productName,
  showThumbnails = true,
}: ProductImageGalleryProps) {
  const galleryImages = getGalleryImages(images);
  const imageSelection = useOptionalProductImageSelection();
  const [localSelectedImage, setLocalSelectedImage] = useState(galleryImages[0] || "");

  const selectedImage = imageSelection?.selectedImage ?? localSelectedImage;
  const setSelectedImage = imageSelection?.setSelectedImage ?? setLocalSelectedImage;

  if (galleryImages.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300">
        <svg className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Thumbnails */}
      {showThumbnails && galleryImages.length > 1 && (
        <div className="order-2 grid grid-cols-4 gap-3 lg:order-1 lg:w-24 lg:grid-cols-1">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`aspect-square overflow-hidden rounded-xl bg-gray-100 ring-2 ring-offset-2 transition ${
                selectedImage === img
                  ? "ring-black"
                  : "ring-transparent hover:ring-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="order-1 aspect-square overflow-hidden rounded-2xl bg-gray-100 lg:order-2 lg:flex-1">
        <img
          src={selectedImage || galleryImages[0]}
          alt={productName}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
