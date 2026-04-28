"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export default function AosInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 120,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refreshHard();
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}