/** Nova emotional states — maps to sprite sheet columns (left → right) */

/** Dedicated Happy Nova artwork (not from sprite sheet) */
/** Bump when asset changes so browsers pick up the new PNG */
export const NOVA_HAPPY_SRC = "/nova-happy.png?v=7";
export const NOVA_HAPPY_SRC_2X = "/nova-happy@2x.png?v=7";

/** Study / focus Nova — desk scene, transparent PNG */
export const NOVA_FOCUS_SRC = "/nova-focus.png?v=1";
export const NOVA_FOCUS_SRC_2X = "/nova-focus@2x.png?v=1";

/** Calendar Nova — holding calendar, transparent PNG */
export const NOVA_CALENDAR_SRC = "/nova-calendar.png?v=1";
export const NOVA_CALENDAR_SRC_2X = "/nova-calendar@2x.png?v=1";

/** Journal Nova — writing in diary, transparent PNG */
export const NOVA_JOURNAL_SRC = "/nova-journal.png?v=1";
export const NOVA_JOURNAL_SRC_2X = "/nova-journal@2x.png?v=1";

/** Square asset — white-background reference, transparent edges */
export const NOVA_HAPPY_ASPECT = 1;
export const NOVA_FOCUS_ASPECT = 1;
export const NOVA_CALENDAR_ASPECT = 1;
export const NOVA_JOURNAL_ASPECT = 1;

export type NovaArtwork = "auto" | "calendar" | "journal";

export type NovaCharacterState =
  | "happy"
  | "overwhelmed"
  | "focus"
  | "break"
  | "success";

export const novaStateIndex: Record<NovaCharacterState, number> = {
  happy: 0,
  overwhelmed: 1,
  focus: 2,
  break: 3,
  success: 4,
};

export const novaStateLabels: Record<NovaCharacterState, string> = {
  happy: "Happy Nova",
  overwhelmed: "Overwhelmed Nova",
  focus: "Focus Nova",
  break: "Break Nova",
  success: "Success Nova",
};
