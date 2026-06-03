/** Nova emotional states — maps to sprite sheet columns (left → right) */

/** Dedicated Happy Nova artwork (not from sprite sheet) */
/** Bump when asset changes so browsers pick up the new PNG */
export const NOVA_HAPPY_SRC = "/nova-happy.png?v=3";

/** Cropped asset dimensions — width × height (551×508) */
export const NOVA_HAPPY_ASPECT = 508 / 551;

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
