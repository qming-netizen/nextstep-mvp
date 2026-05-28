"use client";

interface RecoveryStickyFooterProps {
  children: React.ReactNode;
}

export function RecoveryStickyFooter({ children }: RecoveryStickyFooterProps) {
  return (
    <div className="shrink-0 border-t border-violet-100/60 bg-white/90 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl">
      {children}
    </div>
  );
}
