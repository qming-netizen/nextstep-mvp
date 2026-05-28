"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getFlowHint } from "@/lib/demo-flow";
import { useApp } from "@/context/AppContext";

export function FlowHint() {
  const pathname = usePathname();
  const { demo } = useApp();
  const hint = getFlowHint(pathname, demo);

  return (
    <AnimatePresence>
      {hint && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="shrink-0 border-t border-violet-100/80 bg-white/95 px-4 py-3 backdrop-blur-md"
        >
          <p className="text-[12px] leading-snug text-[#6b6578]">{hint.message}</p>
          <Link
            href={hint.href}
            className="mt-2 flex items-center gap-1 text-[13px] font-semibold text-violet-600"
          >
            {hint.cta}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
