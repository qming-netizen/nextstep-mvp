/** Rotating “tap →” bubbles on Meet Nova — playful, not corporate */

export interface NovaTapComment {
  id: string;
  emoji: string;
  text: string;
}

export const novaTapComments: NovaTapComment[] = [
  {
    id: "friend",
    emoji: "☕",
    text: "I'm not a productivity app. I'm more like a really organised friend.",
  },
  {
    id: "students",
    emoji: "🎯",
    text: "I've helped 2,847 students this month. You're next.",
  },
  {
    id: "all-nighters",
    emoji: "✨",
    text: "Fun fact: students who plan take 40% fewer all-nighters. Let's fix that for you.",
  },
  {
    id: "one-step",
    emoji: "💬",
    text: "No judgment. No giant to-do list. Just one clear next step.",
  },
  {
    id: "calm",
    emoji: "🌙",
    text: "Your brain isn't broken. Your week is just loud. I can help with that.",
  },
];
