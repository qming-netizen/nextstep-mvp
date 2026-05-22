"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface NovaAvatarProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const sizes = {
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 28,
};

export function NovaAvatar({ size = "md", animate = true }: NovaAvatarProps) {
  return (
    <motion.div
      className={`${sizes[size]} relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25`}
      animate={animate ? { scale: [1, 1.03, 1] } : undefined}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <Sparkles
        className="text-white"
        size={iconSizes[size]}
        strokeWidth={2}
      />
      <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
    </motion.div>
  );
}
