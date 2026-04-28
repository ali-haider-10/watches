"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ProductFiltersProps {
  categories: string[];
  currentCategory?: string;
  currentSort?: string;
}

export default function ProductFilters({
  categories,
  currentCategory,
  currentSort,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    router.push(queryString ? `/products?${queryString}` : "/products");
  }

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Category Select */}
        <div className="relative">
          <select
            value={currentCategory || ""}
            onChange={(e) => updateParams({ category: e.target.value || undefined })}
            className="appearance-none rounded-full border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 transition focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:w-48"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Sort Select */}
        <div className="relative">
          <select
            value={currentSort || ""}
            onChange={(e) => updateParams({ sort: e.target.value || undefined })}
            className="appearance-none rounded-full border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-gray-900 transition focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:w-48"
          >
            <option value="">Sort: Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
            <option value="name_desc">Name: Z to A</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
