"use client";
import { useEffect, useRef } from "react";
import { setFormation } from "./stageBus";
import type { Formation } from "./formations";

/** Hold the field in this shape while the section owns the viewport. */
export function useFormation<T extends HTMLElement>(name: Formation) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setFormation(name); },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name]);
  return ref;
}
