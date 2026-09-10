import type { ElementType, ReactNode } from "react";

/**
 * The house device: a 1px olive rule with contact-sheet crop marks at the
 * corners. Everything on this site sits inside one.
 */
export default function Frame({
  children,
  className = "",
  marks = true,
  as: Tag = "div" as ElementType,
}: {
  children?: ReactNode;
  className?: string;
  marks?: boolean;
  as?: ElementType;
}) {
  return (
    <Tag className={`relative rule ${className}`}>
      {marks && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <i className="absolute -top-px -left-px  h-2 w-2 border-t border-l border-lime" />
          <i className="absolute -top-px -right-px h-2 w-2 border-t border-r border-lime" />
          <i className="absolute -bottom-px -left-px  h-2 w-2 border-b border-l border-lime" />
          <i className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-lime" />
        </span>
      )}
      {children}
    </Tag>
  );
}
