/** Assignment-first dashboard data — Nova prioritizes by order, not labels */

export interface MicroStepCard {
  id: string;
  emoji: string;
  title: string;
  duration: string;
  bullets: string[];
  buttonLabel: string;
  /** Shown when user swipes "too much" */
  simplifiedTitle: string;
  href?: string;
}

export interface DashboardAssignment {
  id: string;
  emoji: string;
  title: string;
  course: string;
  dueLabel: string;
  effortHours: number;
  effortLabel: string;
  novaNote: string;
  accent: string;
  microSteps: MicroStepCard[];
}

export const dashboardIntro =
  "✨ Here's what I'd start with this week";

export const weeklyAssignments: DashboardAssignment[] = [
  {
    id: "cs101",
    emoji: "💻",
    title: "CS101 Group Project",
    course: "CS101",
    dueLabel: "Due Thursday 12:00 PM",
    effortHours: 10,
    effortLabel: "10 Hours",
    novaNote:
      "This is your biggest workload this week. Starting early creates breathing room later.",
    accent: "from-violet-500 to-indigo-500",
    microSteps: [
      {
        id: "cs1",
        emoji: "🎯",
        title: "Understand Requirements",
        duration: "2 Hours",
        bullets: [
          "Read project instructions",
          "Identify deliverables",
          "Create checklist",
        ],
        buttonLabel: "Open Assignment →",
        simplifiedTitle: "Skim the brief only",
        href: "/tasks/bio-lab",
      },
      {
        id: "cs2",
        emoji: "🧩",
        title: "Build Project Structure",
        duration: "2 Hours",
        bullets: [
          "Create folders",
          "Set up environment",
          "Create starter files",
        ],
        buttonLabel: "Start Coding →",
        simplifiedTitle: "Create one starter folder",
        href: "/focus-mode",
      },
      {
        id: "cs3",
        emoji: "⚡",
        title: "Build Core Features",
        duration: "3 Hours",
        bullets: [
          "Implement main functionality",
          "Test interactions",
          "Resolve blockers",
        ],
        buttonLabel: "Focus Session →",
        simplifiedTitle: "Build one core feature",
        href: "/focus-mode",
      },
      {
        id: "cs4",
        emoji: "🛠",
        title: "Debug + Polish",
        duration: "2 Hours",
        bullets: ["Fix bugs", "Improve UX", "Final testing"],
        buttonLabel: "Review Progress →",
        simplifiedTitle: "Fix one bug",
        href: "/calendar",
      },
      {
        id: "cs5",
        emoji: "🚀",
        title: "Submit Project",
        duration: "1 Hour",
        bullets: ["Final QA", "Upload files", "Confirm submission"],
        buttonLabel: "Submit →",
        simplifiedTitle: "Upload draft for feedback",
        href: "/tasks",
      },
    ],
  },
  {
    id: "history201",
    emoji: "📚",
    title: "History 201 Essay",
    course: "HIST 201",
    dueLabel: "Due Friday 5:59 PM",
    effortHours: 5,
    effortLabel: "5 Hours",
    novaNote:
      "A rough draft on Wednesday makes this assignment feel dramatically easier.",
    accent: "from-amber-500 to-orange-400",
    microSteps: [
      {
        id: "h1",
        emoji: "📖",
        title: "Understand Prompt",
        duration: "1 Hour",
        bullets: [
          "Read instructions",
          "Identify argument",
          "Collect sources",
        ],
        buttonLabel: "Open Canvas →",
        simplifiedTitle: "Read the prompt once",
        href: "/tasks/hist-reading",
      },
      {
        id: "h2",
        emoji: "📝",
        title: "Build Outline",
        duration: "1.5 Hours",
        bullets: ["Introduction", "Key arguments", "Supporting evidence"],
        buttonLabel: "Open Google Docs →",
        simplifiedTitle: "Write 3 bullet points",
        href: "/tasks/hist-reading",
      },
      {
        id: "h3",
        emoji: "✍️",
        title: "Draft Essay",
        duration: "2 Hours",
        bullets: [
          "Write introduction",
          "Write body sections",
          "Complete first draft",
        ],
        buttonLabel: "Start Writing →",
        simplifiedTitle: "Write the intro only",
        href: "/focus-mode",
      },
      {
        id: "h4",
        emoji: "✨",
        title: "Final Edit",
        duration: "30 Minutes",
        bullets: ["Grammar", "Citations", "Submission check"],
        buttonLabel: "Submit Essay →",
        simplifiedTitle: "Check citations only",
        href: "/tasks/hist-reading",
      },
    ],
  },
  {
    id: "art104",
    emoji: "🎨",
    title: "ART104 Presentation",
    course: "ART104",
    dueLabel: "Due Friday 11:59 PM",
    effortHours: 4,
    effortLabel: "4 Hours",
    novaNote:
      "Creative work feels easier when the topic is chosen early.",
    accent: "from-pink-500 to-rose-400",
    microSteps: [
      {
        id: "a1",
        emoji: "🎨",
        title: "Choose Topic",
        duration: "1 Hour",
        bullets: ["Select topic", "Define presentation direction"],
        buttonLabel: "Open Canva →",
        simplifiedTitle: "Pick one topic idea",
        href: "/tasks/calc-hw",
      },
      {
        id: "a2",
        emoji: "🔍",
        title: "Research References",
        duration: "2 Hours",
        bullets: ["Collect examples", "Gather supporting material"],
        buttonLabel: "Open NotebookLM →",
        simplifiedTitle: "Find 3 references",
        href: "/tasks",
      },
      {
        id: "a3",
        emoji: "📝",
        title: "Draft Slides",
        duration: "1.5 Hours",
        bullets: ["Build presentation structure", "Create first draft"],
        buttonLabel: "Continue →",
        simplifiedTitle: "Draft 3 slides",
        href: "/focus-mode",
      },
      {
        id: "a4",
        emoji: "✨",
        title: "Polish Presentation",
        duration: "30 Minutes",
        bullets: ["Visual improvements", "Final review"],
        buttonLabel: "Review →",
        simplifiedTitle: "Fix slide titles",
        href: "/calendar",
      },
      {
        id: "a5",
        emoji: "🚀",
        title: "Submit Presentation",
        duration: "15 Minutes",
        bullets: ["Upload final version", "Confirm submission"],
        buttonLabel: "Submit →",
        simplifiedTitle: "Upload draft version",
        href: "/tasks",
      },
    ],
  },
];

export const lifeBalanceCategories = [
  { id: "gym", emoji: "🏋️", label: "Gym" },
  { id: "dinner", emoji: "🍜", label: "Dinner with Friends" },
  { id: "events", emoji: "🎉", label: "Campus Events" },
  { id: "selfcare", emoji: "🛌", label: "Self Care" },
  { id: "custom", emoji: "➕", label: "Custom Activity" },
] as const;
