import { NovaCharacter, type NovaCharacterProps } from "./NovaCharacter";

/** Happy Nova — onboarding & welcome */
export function NovaMascot(props: Omit<NovaCharacterProps, "state">) {
  return <NovaCharacter state="happy" {...props} />;
}
