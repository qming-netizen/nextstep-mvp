"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface IOSFloatingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export function IOSFloatingButton({
  children,
  onClick,
  href,
  disabled,
}: IOSFloatingButtonProps) {
  const classes = `flex h-[56px] w-full items-center justify-center rounded-[var(--ios-radius-button)] bg-[var(--ios-tint)] text-[17px] font-semibold tracking-[-0.41px] text-white shadow-[var(--ios-shadow-button)] transition-[transform,opacity,background-color] active:bg-[var(--ios-tint-pressed)] disabled:opacity-[0.38] disabled:shadow-none`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
