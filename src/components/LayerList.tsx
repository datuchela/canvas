import { useState } from "react";
import { useLayers } from "../hooks/useLayersStore";

const LayerList = () => {
  const [input, setInput] = useState("");
  const { layers, addLayer, removeLayer } = useLayers();

  function handleAddLayer(e: React.FormEvent) {
    e.preventDefault();
    addLayer({
      id: layers[0]?.id + 1 || 1,
      name: input,
      z: layers[0]?.z + 1 || 1,
      hidden: false,
      ownerId: 1,
    });
    setInput("");
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
          <li className="flex items-center justify-between">
            <span>{layer.name}</span>
            <button
              className="border px-2 border-white"
              onClick={() => handleDeleteLayer(layer.id)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LayerList;
