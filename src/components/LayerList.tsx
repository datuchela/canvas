import { useState } from "react";
import { useLayers } from "../hooks/useLayersStore";

const LayerList = () => {
  const [input, setInput] = useState("");
  const { layers, addLayer, removeLayer, setCurrentLayerId, currentLayerId } =
    useLayers();

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

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleAddLayer}>
        <input
          className="border border-white p-1"
          type="text"
          placeholder="New layer name"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="p-1 px-3 border border-white">+</button>
      </form>
      <ul>
        {layers?.map((layer) => (
          <label
            className="cursor-pointer"
            key={layer.id}
            htmlFor={layer.id.toString()}
          >
            <li
              className={`flex items-center justify-between gap-2 p-2 ${
                layer.id === currentLayerId && "bg-[rgba(255,255,255,0.1)]"
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
              <img
                className="aspect-video border border-neutral"
                src={layer?.data}
                width={32}
                height={18}
              />
              <span className="flex-1">{layer.name}</span>
              <button
                className="btn btn-sm btn-outline btn-error text-lg"
                onClick={() => handleDeleteLayer(layer.id)}
              >
                -
              </button>
            </li>
          </label>
        ))}
      </ul>
    </div>
  );
};

export default LayerList;
