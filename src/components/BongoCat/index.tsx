/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

import "./index.css";

import Keyboard from "./Keyboard";

import { initLive2D } from "./initLive2D";

import type {
  MouseEventCallbackArgs,
  KeyboardEventCallbackArgs,
} from "@lysyyds/win32-mouse-keyboard-hook";

function BongoCat() {
  const live2d = useRef<any>(null);

  const [activeKeyMap, setActiveKeyMap] = useState({});

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
      "global-keyboard-hook-event",
      (_event, ...args: KeyboardEventCallbackArgs) => {
        const [eventType, keyCode] = args;
        setActiveKeyMap((n) => ({
          ...n,
          [keyCode]: [undefined, true, false][eventType],
        }));

        live2d.current.setParameterValueById(
          "CatParamLeftHandDown",
          [undefined, true, false][eventType],
        );
      },
    );

    window.ipcRenderer.on(
      "global-mouse-hook-event",
      (_event, ...args: MouseEventCallbackArgs) => {
        const [eventType, x, y] = args;
        // 鼠标移动
        // setMousePos({ x, y });
        const xRatio = x / screenSize.width;
        const yRatio = y / screenSize.height;
        for (const id of [
          "ParamMouseX",
          "ParamMouseY",
          "ParamAngleX",
          "ParamAngleY",
        ]) {
          const { min, max } = live2d.current.getParameterRange(id);
          // if (isNil(min) || isNil(max)) continue
          const isXAxis = id.endsWith("X");
          const ratio = isXAxis ? xRatio : yRatio;
          const value = max - ratio * (max - min);
          live2d.current.setParameterValueById(id, value);
        }

        if (eventType == 2) {
          // 按下鼠标左键
          // setLeftActive(true);
          live2d.current.setParameterValueById("ParamMouseLeftDown", true);
        } else if (eventType == 3) {
          // 松开鼠标左键
          // setLeftActive(false);
          live2d.current.setParameterValueById("ParamMouseLeftDown", false);
        } else if (eventType == 4) {
          // 按下鼠标右键
          // setRightActive(true);
          live2d.current.setParameterValueById("ParamMouseRightDown", true);
        } else if (eventType == 5) {
          // 松开鼠标右键
          // setRightActive(false);
          live2d.current.setParameterValueById("ParamMouseRightDown", false);
        } else if (eventType == 6) {
          // 鼠标滚轮
        }
      },
    );
  }, [screenSize]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      initLive2D(canvasRef.current).then((live2dr: any) => {
        live2d.current = live2dr;
      });
    }
  }, []);

  return (
    <>
      <img src="./BongoCatModels/standard/resources/background.png" alt="" />
      <canvas ref={canvasRef} id="canvas"></canvas>
      <Keyboard activeKeyMap={activeKeyMap} />
    </>
  );
}

export default BongoCat;
