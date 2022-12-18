import React, { useState } from "react";
import { useLayers } from "../hooks/useLayersStore";

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
          <label
            className="cursor-pointer"
            key={layer.id}
            htmlFor={layer.id.toString()}
            onKeyDown={handleDeleteKeyPress}
          >
            <li
              className={`flex items-center justify-between gap-2 p-2 pointer-events-none ${
                layer.id === currentLayerId && "bg-neutral text-primary-content"
              }`}
            >
              <input
                type="radio"
                name="currentLayerId"
                id={layer.id.toString()}
                value={layer.id}
                onChange={() => setCurrentLayerId(layer.id)}
                checked={layer.id === currentLayerId}
                hidden
              />
              <input
                className="checkbox checkbox-accent checkbox-sm pointer-events-auto"
                type="checkbox"
                name="hidden"
                checked={!layer.hidden}
                onChange={() => toggleHidden(layer.id, layer.hidden)}
              />
              <img
                className="aspect-video border border-secondary-content"
                src={layer?.data}
                width={32}
                height={18}
              />
              <span className="flex-1">{layer.name}</span>
              <button
                className="pointer-events-auto text-secondary"
                onClick={() => handleDeleteLayer(layer.id)}
              >
                <kbd className="kbd kbd-sm">Del</kbd>
              </button>
            </li>
          </label>
        ))}
      </ul>
    </div>
  );
};

export default LayerList;
