"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IOSStatusBar } from "@/components/ios/IOSStatusBar";

/** iPhone 16 Pro logical resolution (design canvas) */
export const IPHONE_16_PRO = {
  width: 402,
  height: 874,
  bezelRadius: 55,
  screenRadius: 47,
  bezelWidth: 3,
} as const;

function computePhoneScale(): number {
  if (typeof window === "undefined") return 0.85;
  const pad = 48;
  const w = IPHONE_16_PRO.width;
  const h = IPHONE_16_PRO.height;
  const byWidth = (window.innerWidth - pad) / w;
  const byHeight = (window.innerHeight - pad) / h;
  const cap = window.innerWidth < 520 ? 1 : 0.92;
  return Math.min(cap, byWidth, byHeight);
}

interface PhoneFrameProps {
  children: ReactNode;
  variant?: "light" | "dark";
  className?: string;
}

export function PhoneFrame({
  children,
  variant = "light",
  className = "",
}: PhoneFrameProps) {
  const [scale, setScale] = useState(0.85);
  const isDark = variant === "dark";
  const screenBg = isDark ? "#0B0E1B" : "#F2F2F7";
  const { width: W, height: H, bezelRadius, screenRadius, bezelWidth } =
    IPHONE_16_PRO;

  useEffect(() => {
    const update = () => setScale(computePhoneScale());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scaledW = W * scale;
  const scaledH = H * scale;

  return (
    <div className="fixed inset-0 grid place-items-center overflow-hidden bg-[#1c1c1e]">
      <div
        className={`relative ${className}`}
        style={{ width: scaledW, height: scaledH }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: W,
            height: H,
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="absolute inset-0 shadow-[0_32px_64px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]"
            style={{
              borderRadius: bezelRadius,
              background:
                "linear-gradient(145deg, #4a4a4e 0%, #2c2c2e 40%, #3d3d41 100%)",
              padding: bezelWidth,
            }}
          >
            <div
              className="absolute -left-[2px] top-[140px] h-[28px] w-[3px] rounded-l-sm bg-[#5a5a5e]"
              aria-hidden
            />
            <div
              className="absolute -left-[2px] top-[188px] h-[52px] w-[3px] rounded-l-sm bg-[#5a5a5e]"
              aria-hidden
            />
            <div
              className="absolute -left-[2px] top-[252px] h-[52px] w-[3px] rounded-l-sm bg-[#5a5a5e]"
              aria-hidden
            />
            <div
              className="absolute -right-[2px] top-[200px] h-[72px] w-[3px] rounded-r-sm bg-[#5a5a5e]"
              aria-hidden
            />

            <div
              className="ios-root relative flex h-full min-h-0 flex-col overflow-hidden"
              style={{
                borderRadius: screenRadius,
                backgroundColor: screenBg,
              }}
            >
              <IOSStatusBar variant={isDark ? "dark" : "light"} />

              <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
                {children}
              </div>

              <div className="relative z-20 flex shrink-0 justify-center pb-[8px] pt-[4px]">
                <div
                  className={`h-[5px] w-[134px] rounded-full ${
                    isDark ? "bg-white/30" : "bg-black"
                  }`}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
