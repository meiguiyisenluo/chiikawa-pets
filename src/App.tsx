import { useEffect, useRef, useState } from "react";
import "./App.css";

import Keyboard from "./components/Keyboard";
import type { CallbackArgs } from "@lysyyds/win32-mouse-keyboard-hook";

import { initLive2D } from "./index";

function App() {
  const [activeKeyMap, setActiveKeyMap] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [wheelActive, setWheelActive] = useState(false);

  const [screenSize, setScreenSize] = useState({ width: NaN, height: NaN });
  useEffect(() => {
    (async () => {
      const screenSize = (await window.ipcRenderer.invoke(
        "get-screen-size",
      )) as { width: number; height: number };
      setScreenSize(screenSize);
    })();
  }, []);

  useEffect(() => {
    window.ipcRenderer.on(
      "global-keyboard-mouse-hook-event",
      (_event, ...args: CallbackArgs) => {
        const [type, eventType, x, y] = args;
        if (type === "key") {
          // console.log("Key:", x, [undefined, true, false][eventType]);

          setActiveKeyMap((n) => ({
            ...n,
            [x]: [undefined, true, false][eventType],
          }));
        } else if (type === "mouse") {
          // console.log("Mouse:", eventType, x, y);

          setMousePos({ x, y });

          if (eventType == 2) {
            setLeftActive(true);
          } else if (eventType == 3) {
            setLeftActive(false);
          } else if (eventType == 4) {
            setRightActive(true);
          } else if (eventType == 5) {
            setRightActive(false);
          } else if (eventType == 6) {
            setWheelActive(true);
            setTimeout(() => {
              setWheelActive(false);
            }, 100);
          }
        }
      },
    );
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initLive2D(canvasRef.current);
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" width="200" height="200"></canvas>;

  return (
    <>
      <Keyboard activeKeyMap={activeKeyMap} />
      <div>
        screen:{screenSize.width}-{screenSize.height}
      </div>
      <div>
        mouse:{mousePos.x}-{mousePos.y}
        <div>
          <span className={leftActive ? "active" : ""}>left</span>
          &nbsp;
          <span className={rightActive ? "active" : ""}>right</span>
        </div>
        mousewheel:{wheelActive ? "wheeling" : ""}
      </div>
    </>
  );
}

export default App;
