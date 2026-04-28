"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, total } = useCart();
  const router = useRouter();

  const handleClose = useCallback(() => setIsCartOpen(false), [setIsCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, handleClose]);

  const totalDisplay = total.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-[360ms] ease-out ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleClose} 
        aria-hidden="true" 
      />
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md transform-gpu flex-col bg-white shadow-xl transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCartOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!isCartOpen}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
          <button
            onClick={handleClose}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
          >
            <span className="sr-only">Close cart</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mb-8 text-gray-500">Looks like you haven&apos;t added anything yet.</p>
              <button
                onClick={handleClose}
                className="rounded-md bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.productId} className="flex py-6">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="line-clamp-2">
                          <Link href={`/products/${item.slug}`} onClick={handleClose}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="ml-4 whitespace-nowrap">Rs.{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center rounded-md border border-gray-300">
                        <button
                          type="button"
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-gray-900">{item.quantity}</span>
                        <button
                          type="button"
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-6 sm:px-6">
            <div className="flex justify-between text-lg font-medium text-gray-900">
              <p>Subtotal</p>
              <p>Rs.{totalDisplay}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  handleClose();
                  router.push("/checkout");
                }}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="font-medium text-black hover:text-gray-800"
                  onClick={handleClose}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
