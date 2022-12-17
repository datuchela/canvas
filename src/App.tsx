import React, { useState } from "react";
import Canvas from "./components/Canvas";
import LayerList from "./components/LayerList";
import { useLayers } from "./hooks/useLayersStore";

function App() {
  const { layers } = useLayers();

  return (
    <div className="p-8 flex justify-between">
      <div className="">
        {layers?.map((layer) => (
          <Canvas key={layer.id} />
        ))}
      </div>
      <LayerList />
    </div>
  );
}

export default App;
