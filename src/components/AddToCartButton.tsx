"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useOptionalProductImageSelection } from "@/contexts/ProductImageSelectionContext";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  stock: number;
  allImages?: string[];
}

export default function AddToCartButton({
  productId,
  name,
  slug,
  price,
  image,
  stock,
  allImages = [],
}: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const imageSelection = useOptionalProductImageSelection();
  const [quantity, setQuantity] = useState(1);
  const [localSelectedImage, setLocalSelectedImage] = useState(image);
  const [addGiftWrap, setAddGiftWrap] = useState(false);

  const outOfStock = stock === 0;
  const thumbnails = allImages.length > 0 ? allImages.slice(0, 4) : [image];
  const showColorVariants = !imageSelection;
  const selectedImage = imageSelection?.selectedImage ?? localSelectedImage;
  const setSelectedImage = imageSelection?.setSelectedImage ?? setLocalSelectedImage;

  function handleAddToCart() {
    addItem({
      productId,
      name,
      slug,
      price,
      image: selectedImage || image,
    }, quantity);
    setIsCartOpen(true);
  }

  function handleBuyNow() {
    addItem({
      productId,
      name,
      slug,
      price,
      image: selectedImage || image,
    }, quantity);
    router.push("/checkout");
  }

  if (outOfStock) {
    return (
      <button
        disabled
        className="w-full bg-gray-200 py-4 text-sm font-medium text-gray-500 cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Color variants */}
      {showColorVariants && (
        <div>
          <p className="mb-3 text-[12px] font-bold tracking-widest text-[#111111]">
            COLOR <span className="ml-1 font-normal text-gray-400">- SILVER BLACK STICK</span>
          </p>
          <div className="flex gap-2 sm:gap-3">
            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`relative h-[72px] w-[72px] overflow-hidden border-2 transition-colors ${
                  selectedImage === img
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${name} color ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Actions Container */}
      <div className="flex items-center gap-4">
        {/* Minimalist Quantity Selector */}
        <div className="flex h-[52px] items-center border border-gray-300 font-medium">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black disabled:opacity-30"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="flex h-full w-10 items-center justify-center text-gray-500 transition hover:bg-gray-50 hover:text-black disabled:opacity-30"
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-1 gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 h-[52px] flex items-center justify-center bg-gray-100 text-sm font-bold tracking-widest text-[#111111] transition hover:bg-gray-200"
          >
            ADD TO CART
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 h-[52px] flex items-center justify-center border border-[#111111] bg-white text-sm font-bold tracking-widest text-[#111111] transition hover:bg-black hover:text-white"
          >
            BUY IT NOW
          </button>
        </div>
      </div>

      {/* Gift Wrap */}
      <label className="flex cursor-pointer items-center gap-3 group">
        <div className={`flex h-5 w-5 items-center justify-center border transition-colors ${addGiftWrap ? "border-black bg-black text-white" : "border-gray-300 bg-white group-hover:border-gray-400"}`}>
          {addGiftWrap && (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          className="sr-only"
          checked={addGiftWrap}
          onChange={(e) => setAddGiftWrap(e.target.checked)}
        />
        <span className="text-sm font-medium text-gray-800">Add Gift Wrapping - Rs.150 (optional)</span>
      </label>
    </div>
  );
}
