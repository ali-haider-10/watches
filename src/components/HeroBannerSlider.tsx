"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroSlide {
  image: string;
  alt: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}

interface HeroBannerSliderProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

export default function HeroBannerSlider({
  slides,
  intervalMs = 3800,
}: HeroBannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-[22px] bg-black shadow-[0_14px_40px_rgba(0,0,0,0.2)] sm:rounded-[36px]">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Link
            key={`${slide.image}-${index}`}
            href={slide.href}
            className="relative block h-[250px] w-full shrink-0 sm:h-[360px] lg:h-[620px]"
            aria-label={`Open ${slide.title}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

            <div className="absolute left-4 top-1/2 max-w-[70%] -translate-y-1/2 rounded-2xl border border-white/20 bg-black/25 px-4 py-4 backdrop-blur-sm sm:left-8 sm:max-w-[55%] sm:px-6 sm:py-5 lg:left-12 lg:max-w-[45%]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-sm">{slide.eyebrow}</p>
              <p className="mt-2 text-3xl font-bold leading-[0.9] text-white sm:text-5xl lg:text-7xl">{slide.title}</p>
              <p className="mt-2 text-sm text-white/90 sm:text-base lg:text-lg">{slide.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-3 sm:bottom-7">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-[3px] rounded-full transition-all ${
                  isActive ? "w-16 bg-white" : "w-12 bg-white/45 hover:bg-white/75"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
