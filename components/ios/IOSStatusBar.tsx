"use client";

function CellularIcon({ dark }: { dark?: boolean }) {
  const fill = dark ? "white" : "black";
  return (
    <svg width="19" height="12" viewBox="0 0 19 12" aria-hidden>
      <rect x="0" y="7" width="3" height="5" rx="0.5" fill={fill} />
      <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={fill} />
      <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" fill={fill} />
      <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={fill} />
    </svg>
  );
}

function WifiIcon({ dark }: { dark?: boolean }) {
  const stroke = dark ? "white" : "black";
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden>
      <path
        d="M8.5 2.4c2.2 0 4.2.9 5.7 2.3l1.1-1.1C13.3 1.5 11 0.4 8.5 0.4S3.7 1.5 1.7 3.6L2.8 4.7c1.5-1.4 3.5-2.3 5.7-2.3z"
        fill={stroke}
        opacity="0.35"
      />
      <path
        d="M8.5 5.6c1.3 0 2.5.5 3.4 1.4l1.1-1.1c-1.2-1.2-2.9-1.9-4.5-1.9s-3.3.7-4.5 1.9l1.1 1.1c.9-.9 2.1-1.4 3.4-1.4z"
        fill={stroke}
        opacity="0.55"
      />
      <path
        d="M8.5 8.8c.5 0 1-.2 1.4-.6l1.1 1.1a3.5 3.5 0 0 1-5 0l1.1-1.1c.4.4.9.6 1.4.6z"
        fill={stroke}
      />
      <circle cx="8.5" cy="11" r="1.1" fill={stroke} />
    </svg>
  );
}

function BatteryIcon({ dark }: { dark?: boolean }) {
  const stroke = dark ? "white" : "black";
  const fill = dark ? "white" : "black";
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3"
        stroke={stroke}
        strokeOpacity="0.35"
        fill="none"
      />
      <rect x="2" y="2" width="18" height="9" rx="1.5" fill={fill} />
      <path
        d="M24 4.5v4c1-.3 1.5-.8 1.5-2s-.5-1.7-1.5-2z"
        fill={stroke}
        fillOpacity="0.4"
      />
    </svg>
  );
}

export function IOSStatusBar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  const textClass = dark ? "text-white" : "text-black";

  return (
    <div
      className={`relative z-30 flex h-[54px] shrink-0 items-end justify-between px-[28px] pb-[6px] ${textClass}`}
      role="presentation"
    >
      <time
        className="w-[54px] text-[17px] font-semibold leading-none tracking-[-0.02em]"
        dateTime="09:41"
      >
        9:41
      </time>

      {/* Dynamic Island — centered in status bar layer */}
      <div
        className="pointer-events-none absolute left-1/2 top-[11px] h-[37px] w-[126px] -translate-x-1/2 rounded-[20px] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        aria-hidden
      />

      <div className="flex w-[78px] items-center justify-end gap-[6px]">
        <CellularIcon dark={dark} />
        <WifiIcon dark={dark} />
        <BatteryIcon dark={dark} />
      </div>
    </div>
  );
}
