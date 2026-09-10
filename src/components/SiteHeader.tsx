"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { NAV, NAV_MORE } from "@/lib/site";

export default function SiteHeader() {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
      lifted || open ? "bg-canvas/94 rule-b backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[76px] max-w-[1480px] items-center gap-3 px-5 sm:gap-6 sm:px-8">
        <Link href="/" aria-label="Happiness Centre — home"><Wordmark /></Link>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {NAV.map((n) => {
            const active = path === n.href || path.startsWith(n.href + "/");
            return (
              <Link key={n.href} href={n.href}
                    className={`group relative text-[0.82rem] font-medium transition-colors hover:text-forest ${
                      active ? "text-forest" : "text-ink/80"}`}>
                {n.label}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-lime transition-[width] duration-300 ${
                  active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        <Link href="/free-day"
              className="ml-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-4 py-2.5 text-[0.74rem] font-semibold text-white transition-colors hover:bg-bark sm:px-5 sm:text-[0.8rem] lg:ml-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          Day 1 is free
        </Link>

        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="menu"
                className="-mr-1 grid h-10 w-10 shrink-0 place-items-center lg:hidden">
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-5">
            <span className={`absolute inset-x-0 top-0 h-px bg-forest transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-[6px] h-px bg-forest transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 top-[12px] h-px bg-forest transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <div id="menu" hidden={!open} className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-hairline bg-canvas lg:hidden">
        <nav className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8">
          <ul className="grid gap-px bg-hairline">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="display block bg-canvas py-4 text-[1.35rem] text-forest">{n.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid grid-cols-2 gap-y-3">
            {NAV_MORE.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="text-[0.88rem] text-muted hover:text-forest">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
