import React, { useState } from "react";
import Canvas from "./components/Canvas";
import LayerList from "./components/LayerList";
import Toolbar from "./components/Toolbar";
import { useLayers } from "./hooks/useLayersStore";

function App() {
  const { layers } = useLayers();

  return (
    <div>
      <Toolbar />
      <div className="p-8 flex justify-between w-full">
        <div className="relative w-[1280px] h-[720px] aspect-video border border-neutral">
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
