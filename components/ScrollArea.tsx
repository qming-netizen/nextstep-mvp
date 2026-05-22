"use client";

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  withNavPadding?: boolean;
}

export function ScrollArea({
  children,
  className = "",
  withNavPadding = true,
}: ScrollAreaProps) {
  return (
    <div
      className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain ${withNavPadding ? "pb-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
