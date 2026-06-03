"use client";

export function PlayfulBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-[430px] overflow-hidden"
      aria-hidden
    >
      <div className="absolute -right-16 top-24 h-48 w-48 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="absolute -left-12 top-[45%] h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-32 right-8 h-32 w-32 rounded-full bg-purple-300/20 blur-2xl" />
    </div>
  );
}
