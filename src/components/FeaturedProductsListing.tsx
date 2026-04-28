"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import type { Product } from "@/lib/types";
import AOS from "aos";

interface FeaturedTab {
  key: string;
  label: string;
  products: Product[];
}

interface FeaturedProductsListingProps {
  tabs: FeaturedTab[];
}

export default function FeaturedProductsListing({ tabs }: FeaturedProductsListingProps) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key || "");
  const tabsRowRef = useRef<HTMLDivElement | null>(null);
  const [isTabsRowInView, setIsTabsRowInView] = useState(false);

  useEffect(() => {
    if (!tabsRowRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsTabsRowInView(entry.isIntersecting);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(tabsRowRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 90);

    return () => clearTimeout(timer);
  }, [activeKey]);

  const activeTab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeKey) || tabs[0];
  }, [tabs, activeKey]);

  if (!activeTab) {
    return null;
  }

  const visibleProducts = activeTab.products.slice(0, 8);

  return (
    <>
      <div className="overflow-x-auto pb-2">
        <div
          ref={tabsRowRef}
          className="mx-auto flex w-max min-w-full items-center justify-center gap-3 sm:gap-6 lg:gap-10"
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab.key === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={`category-tab featured-tab-item rounded-[10px] px-5 py-3 text-xs font-semibold uppercase tracking-[0.05em] transition sm:px-8 sm:text-sm lg:px-11 ${
                  isTabsRowInView ? "is-visible" : ""
                } ${
                  isActive
                    ? "category-tab-active bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                    : "text-[#111827] hover:bg-black/5"
                }`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
          No featured products in this category yet.
        </div>
      ) : (
        <div key={activeTab.key} className="category-grid-enter mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <div
              key={product._id}
              data-aos="fade-right"
              data-aos-delay={String(Math.min(1100, index * 130))}
              data-aos-duration="820"
              data-aos-anchor-placement="top-bottom"
            >
              <FeaturedProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
