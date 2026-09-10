import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.9rem] font-semibold transition-colors";

const variants = {
  solid: "bg-forest text-white hover:bg-bark",
  ghost: "border border-hairline bg-white/70 text-forest backdrop-blur-sm hover:bg-mist",
  light: "bg-white text-forest hover:bg-mist",
  outlineLight: "border border-white/35 text-white hover:bg-white/10",
} as const;

export default function Button({
  href, children, variant = "solid", className = "",
}: { href: string; children: ReactNode; variant?: keyof typeof variants; className?: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
