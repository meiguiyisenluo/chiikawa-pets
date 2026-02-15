import keyImages from "./keycode";

function Keyboard({ activeKeyMap }: { activeKeyMap: Record<number, boolean> }) {
  return (
    <>
      {Object.entries(keyImages).map(([key, value]) => (
        <>
          <img
            key={key + "keyboard"}
            style={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              display: activeKeyMap[key] ? "block" : "none",
            }}
            src={"./HachiwareModels/standard/keyboard/" + value}
            alt=""
          />
          <img
            key={key + "hand"}
            style={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              display: activeKeyMap[key] ? "block" : "none",
            }}
            src={"./HachiwareModels/standard/hand/" + value}
            alt=""
          />
        </>
      ))}
    </>
  );
}

export default Keyboard;
