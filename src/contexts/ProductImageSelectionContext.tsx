"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ProductImageSelectionContextValue {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
}

const ProductImageSelectionContext = createContext<ProductImageSelectionContextValue | null>(null);

interface ProductImageSelectionProviderProps {
  initialImage: string;
  children: ReactNode;
}

export function ProductImageSelectionProvider({ initialImage, children }: ProductImageSelectionProviderProps) {
  const [selectedImage, setSelectedImage] = useState(initialImage);

  return (
    <ProductImageSelectionContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ProductImageSelectionContext.Provider>
  );
}

export function useOptionalProductImageSelection() {
  return useContext(ProductImageSelectionContext);
}