import React, { useState } from "react";
import { useLayers } from "../hooks/useLayersStore";
import Layer from "./molecules/Layer";

const LayerList = () => {
  const [input, setInput] = useState("");
  const {
    layers,
    addLayer,
    removeLayer,
    setCurrentLayerId,
    currentLayerId,
    toggleHidden,
  } = useLayers();

  function handleAddLayer(e: React.FormEvent) {
    e.preventDefault();
    const newLayer = {
      id: layers[0]?.id + 1 || 1,
      name: input,
      z: layers[0]?.z + 1 || 1,
      hidden: false,
      ownerId: 1,
    };
    addLayer(newLayer);
    setInput("");
    setCurrentLayerId(newLayer.id);
  }

  function handleAddEmptyLayer() {
    const newLayerId = layers[0]?.id + 1 || 1;
    const newLayerZ = layers[0]?.z + 1 || 1;
    const newEmptyLayer = {
      id: newLayerId,
      name: `Layer ${newLayerId}`,
      z: newLayerZ,
      hidden: false,
      ownerId: 1,
    };
    addLayer(newEmptyLayer);
    setCurrentLayerId(newEmptyLayer.id);
  }

  function handleDeleteLayer(id: number) {
    removeLayer(id);
  }

  function handleDeleteKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
    console.log(e);
    // TODO: Capture key press, and delete item

    // switch (e.key) {
    //   case "Del":
    //     break;

    //   default:
    //     break;
    // }
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleAddLayer} className="flex items-center gap-2">
        <input
          className="input input-bordered input-sm"
          type="text"
          placeholder="New layer name"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-sm btn-outline">+</button>
      </form>
      <ul>
        {layers?.map((layer) => (
          <Layer layer={layer} />
        ))}
      </ul>
      <div className="flex items-center justify-end gap-2 p-2 border-t border-neutral">
        <button
          className="pointer-events-auto text-secondary"
          onClick={() => handleAddEmptyLayer()}
        >
          <kbd className="kbd kbd-sm">+</kbd>
        </button>
        <button
          className="pointer-events-auto text-secondary"
          onClick={() => handleDeleteLayer(currentLayerId)}
        >
          <kbd className="kbd kbd-sm">Del</kbd>
        </button>
      </div>
    </div>
  );
};

export default LayerList;
