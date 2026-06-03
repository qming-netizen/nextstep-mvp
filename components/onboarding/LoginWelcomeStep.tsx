"use client";

import { motion } from "framer-motion";
import { IOSTextFieldGroup } from "@/components/ios/IOSTextFieldGroup";

export function LoginWelcomeStep({
  name,
  email,
  onName,
  onEmail,
}: {
  name: string;
  email: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
}) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      style={{
        paddingLeft: "var(--ios-content-x)",
        paddingRight: "var(--ios-content-x)",
        paddingTop: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center pt-2"
      >
        <div
          className="flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-gradient-to-br from-[#8B7CFF] to-[#6B5CE7] shadow-[0_6px_20px_rgba(107,92,231,0.32)]"
          aria-hidden
        >
          <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 6l2.2 6.8H27l-5.5 4 2.1 6.8L18 19.6l-5.6 4 2.1-6.8-5.5-4h6.8L18 6z"
              fill="white"
              fillOpacity="0.95"
            />
          </svg>
        </div>

        <h1 className="ios-large-title mt-4 text-center">Welcome to NextStep</h1>
        <p className="ios-body mt-1.5 max-w-[280px] text-center text-[15px] leading-[20px]">
          A calm planning companion for when school feels like too much.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6"
      >
        <IOSTextFieldGroup
          sectionTitle="Your info"
          fields={[
            {
              id: "login-name",
              label: "Name",
              value: name,
              onChange: onName,
              placeholder: "Name",
              autoComplete: "name",
            },
            {
              id: "login-email",
              label: "Email",
              type: "email",
              value: email,
              onChange: onEmail,
              placeholder: "Email",
              autoComplete: "email",
              keyboard: "email",
            },
          ]}
        />
        <p className="ios-footnote mt-3 px-1">
          Stored on this device only. No account required to try Nova.
        </p>
      </motion.div>

      <p className="ios-footnote pb-1 pt-4 text-center">
        Already using NextStep?{" "}
        <button
          type="button"
          className="font-medium text-[var(--ios-tint)]"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
