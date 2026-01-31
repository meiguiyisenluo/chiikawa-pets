import { OmitKeyCode } from "./KeyCodeMap";

function Keyboard({ activeKeyMap }: { activeKeyMap: Record<number, boolean> }) {
  return (
    <>
      {OmitKeyCode.map((_) => (
        <span className={activeKeyMap[_.key] ? "active" : ""}>{_.value}</span>
      ))}
    </>
  );
}

export default Keyboard;
