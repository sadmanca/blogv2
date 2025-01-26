import { FeelbackPulse, PRESET_PULSE_HEART, FeelbackYesNo, PRESET_UP_DOWN_VOTE } from "@feelback/react";

export default function Feelback() {
  return (
    <div className="container flex flex-wrap justify-center ml-5 gap-10">
      <FeelbackPulse
        contentSetId="3574bcc4-bcec-4cca-8849-f94e570edf04"
        preset={PRESET_PULSE_HEART}
        showCount
      />
    <FeelbackYesNo
        contentSetId="c2a26718-b0da-4fd7-a4a6-b773fe00ba9d"
        preset={PRESET_UP_DOWN_VOTE}
        showCount
    />
    </div>
  );
}