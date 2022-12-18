import { useEffect } from "react";
import Canvas from "./components/molecules/Canvas";
import LayerList from "./components/LayerPanel";
import Toolbar from "./components/Toolbar";
import { useLayers } from "./hooks/useLayersStore";
import { usePreferences } from "./hooks/usePreferStore";

function App() {
  const { theme } = usePreferences();
  const { layers } = useLayers();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <Toolbar />
      <div className="p-8 flex justify-between w-full">
        <div className="relative w-[1280px] aspect-video border border-neutral overflow-hidden">
          {layers?.map((layer) => (
            <Canvas key={layer.id} layer={layer} />
          ))}
        </div>
        <LayerList />
      </div>
    </div>
  );
}

export default App;
