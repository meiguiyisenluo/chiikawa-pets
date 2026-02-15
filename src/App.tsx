import Hachiware from "./components/Hachiware";
import BongoCat from "./components/BongoCat";
import { useEffect, useState } from "react";

type Pets = "chii" | "hachiware" | "usagi" | "BongoCat";

const App = () => {
  const [pet, setPet] = useState<Pets>("BongoCat");
  useEffect(() => {
    const cch = (_event: Electron.IpcRendererEvent, c: Pets) => {
      setPet(c);
    };
    window.ipcRenderer.on("change-charator", cch);
    return () => {
      window.ipcRenderer.off("change-charator", cch);
    };
  }, []);

  let Pet = Hachiware;
  if (pet === "hachiware") Pet = Hachiware;
  else Pet = BongoCat;

  return <Pet />;
};
export default App;
