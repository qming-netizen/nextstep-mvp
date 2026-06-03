"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function NovaHeroAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mx-auto h-[88px] w-[88px]"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/40 via-purple-400/30 to-blue-400/20 blur-md" />
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-violet-100 to-purple-50" />
      <div className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 shadow-lg shadow-violet-500/30">
        <Sparkles className="text-white" size={36} strokeWidth={1.75} />
      </div>
      <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[2.5px] border-white bg-emerald-400 shadow-sm" />
    </motion.div>
  );
}
