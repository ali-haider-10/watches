"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeroQuickOption {
  name: string;
  href: string;
  image: string;
  isSale?: boolean;
}

interface HeroQuickOptionsRowProps {
  options: HeroQuickOption[];
}

export default function HeroQuickOptionsRow({ options }: HeroQuickOptionsRowProps) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInView(entry.isIntersecting);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(rowRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rowRef} className="flex gap-6 overflow-x-auto pb-3 sm:justify-center">
      {options.map((item, index) => (
        <Link
          key={item.name}
          href={item.href}
          className={`hero-quick-item group min-w-[118px] text-center ${isInView ? "is-visible" : ""}`}
          style={{ animationDelay: `${index * 120}ms` }}
        >
          {item.isSale ? (
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-black to-[#595959] text-white sm:h-28 sm:w-28">
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/80">Up To</p>
                <p className="text-2xl font-bold">40%</p>
                <p className="text-base font-semibold">Eid Sale</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-white shadow ring-1 ring-black/10 sm:h-28 sm:w-28">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <p className="mt-3 text-sm font-medium text-[#191919] sm:text-lg">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}