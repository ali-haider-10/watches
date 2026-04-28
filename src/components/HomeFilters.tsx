"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AOS from "aos";

interface HomeFiltersProps {
  currentCategory?: string;
  categories?: string[];
}

const FEATURED_CATEGORY_ORDER = [
  "Men's Watches",
  "Women's Watches",
  "Smart Watches",
  "Best Sellers",
  "Couple Watches",
] as const;

const FEATURED_CATEGORY_LABELS: Record<string, string> = {
  "Men's Watches": "MEN",
  "Women's Watches": "WOMEN",
  "Smart Watches": "SMART WATCHES",
  "Best Sellers": "BEST SELLER",
  "Couple Watches": "COUPLE",
};

function toFilterLabel(category: string) {
  return FEATURED_CATEGORY_LABELS[category] || category.toUpperCase();
}

function sortFilterCategories(categories: string[]) {
  const ordered = FEATURED_CATEGORY_ORDER.filter((category) => categories.includes(category));
  const extras = categories
    .filter((category) => !FEATURED_CATEGORY_ORDER.includes(category as (typeof FEATURED_CATEGORY_ORDER)[number]))
    .sort((a, b) => a.localeCompare(b));

  return [...ordered, ...extras];
}

export default function HomeFilters({
  currentCategory,
  categories = [],
}: HomeFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const visibleCategories = sortFilterCategories(categories);

  useEffect(() => {
    AOS.refresh();
  }, [visibleCategories.length, currentCategory]);

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : "/");
  }

  return (
    <div className="overflow-x-auto pb-1">
      <div className="mx-auto flex w-max min-w-full items-center justify-center gap-4 sm:gap-6">
        {visibleCategories.map((categoryName, index) => {
          const isActive = currentCategory
            ? currentCategory === categoryName
            : index === 0;

          return (
            <button
              key={categoryName}
              onClick={() => updateParams({ category: categoryName })}
              data-aos="flip-up"
              data-aos-delay={String(Math.min(320, index * 60))}
              data-aos-duration="720"
              className={`category-tab rounded-[12px] px-6 py-3 text-sm font-semibold uppercase tracking-[0.05em] transition sm:px-10 sm:text-3xl ${
                isActive
                  ? "category-tab-active bg-black text-white"
                  : "text-[#111827] hover:bg-black/5"
              }`}
            >
              {toFilterLabel(categoryName)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
