import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import HomeFilters from "@/components/HomeFilters";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import HeroBannerSlider from "@/components/HeroBannerSlider";
import FeaturedProductsListing from "@/components/FeaturedProductsListing";
import HeroQuickOptionsRow from "@/components/HeroQuickOptionsRow";
import { getCategories, getProducts, getProductsByCategory } from "@/lib/data";

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

function toFeaturedLabel(category: string) {
  return FEATURED_CATEGORY_LABELS[category] || category.toUpperCase();
}

function sortFeaturedCategories(categories: string[]) {
  const ordered = FEATURED_CATEGORY_ORDER.filter((category) => categories.includes(category));
  const extras = categories
    .filter((category) => !FEATURED_CATEGORY_ORDER.includes(category as (typeof FEATURED_CATEGORY_ORDER)[number]))
    .sort((a, b) => a.localeCompare(b));

  return [...ordered, ...extras];
}

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    category?: string;
    sort?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const q = params.q || "";
  const category = params.category || "";
  const sort = params.sort || "";

  const showHero = !q && !category && page === 1;

  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let pagination: Awaited<ReturnType<typeof getProducts>>["pagination"] = {
    page: 1,
    limit: 12,
    total: 0,
    pages: 1,
  };

  let featuredTabs: {
    key: string;
    label: string;
    products: Awaited<ReturnType<typeof getProductsByCategory>>;
  }[] = [];

  const categories = await getCategories();

  if (showHero) {
    const featuredCategories = sortFeaturedCategories(categories);
    const featuredProductsByCategory = await Promise.all(
      featuredCategories.map((categoryName) => getProductsByCategory(categoryName, 8))
    );

    featuredTabs = featuredCategories
      .map((categoryName, index) => ({
        key: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        label: toFeaturedLabel(categoryName),
        products: featuredProductsByCategory[index],
      }))
      .filter((tab) => tab.products.length > 0);
  } else {
    const productResult = await getProducts({
      page,
      limit: 12,
      q: q || undefined,
      category: category || undefined,
      sort: sort || undefined,
    });

    products = productResult.products;
    pagination = productResult.pagination;
  }

  const currentSearchParams: Record<string, string> = {};
  if (q) currentSearchParams.q = q;
  if (category) currentSearchParams.category = category;
  if (sort) currentSearchParams.sort = sort;

  const heroQuickOptions = [
    {
      name: "Eid Sale",
      href: "/products?category=Best%20Sellers",
      isSale: true,
      image: "",
    },
    {
      name: "Men Formal",
      href: "/products?category=Men%27s%20Watches",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=500",
    },
    {
      name: "Men Sports",
      href: "/products?category=Men%27s%20Watches",
      image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=500",
    },
    {
      name: "Female Fancy",
      href: "/products?category=Women%27s%20Watches",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=500",
    },
    {
      name: "Female Bracelets",
      href: "/products?category=Women%27s%20Watches",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=500",
    },
    {
      name: "Smart Watches",
      href: "/products?category=Smart%20Watches",
      image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?q=80&w=500",
    },
    {
      name: "Couple Watches",
      href: "/products?category=Couple%20Watches",
      image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=500",
    },
  ];

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2000",
      alt: "Eid sale hero banner",
      href: "/products?category=Best%20Sellers",
      eyebrow: "40% Off",
      title: "Eid Sale",
      description: "Upto OFF on latest collections",
    },
    {
      image: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=2000",
      alt: "New arrival watches",
      href: "/products?category=Men%27s%20Watches",
      eyebrow: "New Arrival",
      title: "Men Formal",
      description: "Modern statement watches for every outfit.",
    },
    {
      image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?q=80&w=2000",
      alt: "Smart watch collection",
      href: "/products?category=Smart%20Watches",
      eyebrow: "Smart Watches",
      title: "Track Everything",
      description: "Fitness-ready smart watches with premium design.",
    },
  ];

  return (
    <>
      {showHero && (
        <section className="bg-gradient-to-r from-[#7cae9b] to-[#f0e2ad] py-3 sm:py-5">
          <div className="mx-auto max-w-[1500px] px-2 sm:px-4">
            <HeroBannerSlider slides={heroSlides} intervalMs={4200} />
          </div>
        </section>
      )}

      {showHero && (
        <section className="bg-[#efefef] py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4">
            <HeroQuickOptionsRow options={heroQuickOptions} />
          </div>
        </section>
      )}

      <section className={showHero ? "border-y border-gray-100 bg-[#fcfcfb] py-16" : "py-8"}>
        <div className="mx-auto max-w-7xl px-4">
          {showHero && (
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold uppercase tracking-[0.04em] text-[#111827] sm:text-3xl">
                Featured Products
              </h2>
            </div>
          )}

          {showHero ? (
            <FeaturedProductsListing tabs={featuredTabs} />
          ) : (
            <>
              <Suspense>
                <HomeFilters
                  currentCategory={category}
                  categories={categories}
                />
              </Suspense>

              {products.length === 0 ? (
                <div className="mt-8">
                  <EmptyState
                    title="No watches found"
                    description="Try adjusting your search or filters to find the right timepiece."
                    actionLabel="Clear Filters"
                    actionHref="/"
                  />
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                basePath="/"
                searchParams={currentSearchParams}
              />
            </>
          )}
        </div>
      </section>

      {showHero && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-black/10 bg-[#f7f2e8] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">Free Delivery</h3>
                <p className="mt-1 text-sm text-gray-600">Fast nationwide shipping on eligible orders.</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#f7f2e8] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">Live Tracking</h3>
                <p className="mt-1 text-sm text-gray-600">Track your order in real time from dispatch to delivery.</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#f7f2e8] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">Cash On Delivery</h3>
                <p className="mt-1 text-sm text-gray-600">Pay when your order reaches your doorstep.</p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#f7f2e8] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-black">Warranty Support</h3>
                <p className="mt-1 text-sm text-gray-600">Backed by a one-year movement warranty.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {showHero && (
        <section className="bg-[#e9e0d2] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#665638]">About Lumina</p>
              <h2 className="product-card-title mt-2 text-4xl leading-none text-[#17120a] sm:text-5xl">
                Built For Daily Wear,
                <br />
                Designed For Lasting Style.
              </h2>
              <p className="mt-5 max-w-2xl text-sm text-[#4c3f2b] sm:text-base">
                Lumina curates timepieces that blend reliable movement, premium finishes, and modern silhouettes.
                From formal straps to smart dials, our goal is simple: give you standout design at practical prices.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#665638]">Why Customers Choose Us</p>
              <ul className="mt-4 space-y-3 text-sm text-[#2e2619]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                  Modern watch collections refreshed regularly.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                  Cash on delivery and responsive customer support.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-black" />
                  Trusted quality checks before shipping every order.
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
