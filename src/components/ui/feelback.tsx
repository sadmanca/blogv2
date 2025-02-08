import { FeelbackPulse, PRESET_PULSE_HEART, FeelbackYesNo, PRESET_UP_DOWN_VOTE } from "@feelback/react";

export default function Feelback() {
  return (
    <FeelbackPulse
      contentSetId="3574bcc4-bcec-4cca-8849-f94e570edf04"
      preset={PRESET_PULSE_HEART}
      showCount
    />
  );
}