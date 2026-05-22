"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: "solid" | "soft";
  className?: string;
}

export function PrimaryButton({
  children,
  onClick,
  href,
  disabled,
  variant = "solid",
  className = "",
}: PrimaryButtonProps) {
  const base =
    variant === "solid"
      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
      : "bg-violet-50 text-violet-700";

  const classes = `flex h-[52px] w-full items-center justify-center rounded-2xl text-[16px] font-semibold transition-opacity disabled:opacity-40 ${base} ${className}`;

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
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
