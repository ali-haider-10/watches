"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { useCart } from "@/contexts/CartContext";

type NavItem = {
  label: string;
  href: string;
  exact?: boolean;
  category?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "EID SALE", href: "/products?category=Best%20Sellers", category: "Best Sellers" },
  { label: "NEW ARRIVAL", href: "/products" },
  { label: "SMART WATCHES", href: "/products?category=Smart%20Watches", category: "Smart Watches" },
  { label: "MEN", href: "/products?category=Men%27s%20Watches", category: "Men's Watches" },
  { label: "WOMEN", href: "/products?category=Women%27s%20Watches", category: "Women's Watches" },
  { label: "BEST SELLERS", href: "/products?category=Best%20Sellers", category: "Best Sellers" },
  { label: "FOR COUPLES", href: "/products?category=Couple%20Watches", category: "Couple Watches" },
  { label: "TRACK ORDER", href: "/orders/tracking", exact: true },
];

function isNavItemActive(pathname: string, currentCategory: string | null, item: NavItem) {
  if (item.category) {
    return pathname === "/products" && currentCategory === item.category;
  }

  if (item.href === "/products") {
    return pathname === "/products";
  }

  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCategory = searchParams.get("category");
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, isLoading: isCartLoading, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex h-[84px] w-full max-w-[1500px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        <Link href="/" className="flex shrink-0 flex-col leading-none">
          <span className="text-3xl font-semibold tracking-[0.08em] text-white">ARVEXAS</span>
          {/* <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/70">Since 2025</span> */}
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = isNavItemActive(pathname, currentCategory, item);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-[14px] font-medium uppercase tracking-[0.03em] transition ${
                  isActive
                    ? "text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href={user ? "/account" : "/auth/login"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label={user ? "My account" : "Sign in"}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
            aria-label="View cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {!isCartLoading && itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ff4f3d] px-1 text-[10px] font-semibold text-white ring-2 ring-black">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black xl:hidden">
          <nav className="grid gap-1 px-3 py-4">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, currentCategory, item);

              return (
                <Link
                  key={`mobile-${item.label}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.04em] transition ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            {!user ? (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-full border border-white/25 px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  My Account
                </Link>
                <button
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => router.push("/auth/login"),
                      },
                    });
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
