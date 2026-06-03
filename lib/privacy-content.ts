export const novaDataPipeline = {
  title: "How Nova works",
  subtitle: "From your data to gentle action — nothing happens in the dark.",
  columns: [
    {
      id: "sources",
      label: "Data sources",
      accent: "violet",
      items: [
        {
          title: "Canvas LMS",
          description: "Assignment deadlines, course syllabi",
          emoji: "📅",
        },
        {
          title: "Google Calendar",
          description: "Schedule, free time blocks",
          emoji: "🗓️",
        },
        {
          title: "Activity logs",
          description: "When you actually work on tasks",
          emoji: "📱",
        },
        {
          title: "Habit data",
          description: "Sleep, focus patterns, location",
          emoji: "🎯",
        },
      ],
    },
    {
      id: "brain",
      label: "Nova brain",
      accent: "purple",
      items: [
        {
          title: "Pattern learning",
          description: "How long tasks really take you",
          emoji: "🧠",
        },
        {
          title: "Risk detection",
          description: "When plans are about to break",
          emoji: "⚡",
        },
        {
          title: "Context analysis",
          description: "Your energy, stress, schedule",
          emoji: "📊",
        },
        {
          title: "Smart scheduling",
          description: "Find the best time for each task",
          emoji: "🎯",
        },
      ],
    },
    {
      id: "engage",
      label: "How Nova engages",
      accent: "emerald",
      items: [
        {
          title: "Nudge notifications",
          description: "Timely, specific suggestions",
          emoji: "💬",
        },
        {
          title: "Task breakdown",
          description: "Big tasks into small steps",
          emoji: "📝",
        },
        {
          title: "Plan adjustments",
          description: "Reschedule when life happens",
          emoji: "🔄",
        },
        {
          title: "Positive reinforcement",
          description: "Celebrate wins, build habits",
          emoji: "🎉",
        },
      ],
    },
  ],
} as const;

export const explainabilityCards = [
  {
    title: "Every suggestion includes reasoning",
    body: "“I noticed your essay is due in 10 hours. You typically take 4 hours for essays, and I see a 2-hour gap at 3pm today.”",
  },
  {
    title: "Estimates are clearly marked",
    body: "“I'm estimating 90 minutes for this essay — this is your first one this semester, so the estimate might be off.”",
  },
  {
    title: "Data sources are visible",
    body: "You can see exactly which apps Nova reads and what it learned from each source.",
  },
  {
    title: "Choices always available",
    body: "Every suggestion has “accept” or “not right now.” You stay in complete control.",
  },
] as const;

export const transparencyDemo = {
  message:
    "Hey! Your essay is due in 10 hours but you haven't started. Want to break it down into steps?",
  reasoningLink: "See why I'm suggesting this",
  accept: "Yes, let's do this",
  dismiss: "Not right now",
} as const;

export const boundaryCards = [
  {
    title: "Student approval required",
    body: "Nova cannot drop tasks, change deadlines, or reschedule without your explicit approval. It suggests — you decide.",
  },
  {
    title: "No mental health diagnosis",
    body: "If patterns suggest serious stress, Nova recommends campus counseling resources — it never diagnoses or acts as a therapist.",
  },
  {
    title: "No academic dishonesty",
    body: "Nova will not write essays, solve problem sets, or generate academic content. It helps you plan and organize — not cheat.",
  },
  {
    title: "No engagement spam",
    body: "Nova sends only necessary notifications — not to maximize screen time or app engagement metrics.",
  },
  {
    title: "You always have control",
    body: "Final decisions are always yours. Nova can be dismissed at any time and won't repeat refused suggestions more than once per day.",
    highlight: true,
  },
] as const;

export const riskCards = [
  {
    title: "Over-reliance risk",
    description: "Students may stop developing their own planning skills if Nova does all the cognitive work.",
    mitigation:
      "Nova shows its reasoning explicitly and always offers choice, encouraging active decision-making rather than passive following.",
  },
  {
    title: "Ignoring burnout signals",
    description: "Students may push through exhaustion to hit productivity goals.",
    mitigation:
      "Nova detects patterns like “I need a break” or repeated task declines and suggests rest rather than more work.",
  },
  {
    title: "Inaccurate time estimates",
    description: "If Nova consistently underestimates task duration, students may lose trust.",
    openQuestion:
      "How many data points are needed before estimates become reliable for each task type?",
  },
  {
    title: "Data privacy concerns",
    description: "What level of calendar and app access feels helpful vs invasive?",
    openQuestion:
      "Should students be able to fine-tune exactly which data Nova can access?",
  },
  {
    title: "Notification fatigue",
    description: "Even well-intentioned nudges can become noise.",
    openQuestion:
      "How do we detect when students start ignoring notifications and adjust frequency automatically?",
  },
] as const;

export const deviceStorageNotes = [
  "Your profile, plan, and completed steps stay on this device.",
  "Integration tokens are stored securely and never shared with other students.",
  "You can disconnect Canvas or Calendar anytime from Settings → Integrations.",
  "Anonymous analytics, when enabled, sends only aggregated usage — never assignment text.",
] as const;
