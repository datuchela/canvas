import { useEffect } from "react";
import { useLayers } from "../hooks/useLayersStore";
import Layer from "./molecules/Layer";

const LayerPanel = () => {
  const { layers, addLayer, removeLayer, setCurrentLayerId, currentLayerId } = useLayers();

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
    setCurrentLayerId(null);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, { once: true });
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentLayerId]);

  function handleKeyPress(e: KeyboardEvent) {
    switch (e.key) {
      case "Delete":
        if (!currentLayerId) return;
        handleDeleteLayer(currentLayerId);
        break;

      case "z":
        if (!e.ctrlKey) return;
        // TODO: implement ctrl+z functionality
        console.log("should revert back");
        break;

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col gap-4 p-2 w-[12.5%] h-fit border border-neutral rounded-sm">
      <ul>
        {layers?.map((layer) => (
          <Layer key={layer.id} layer={layer} />
        ))}
      </ul>
      <div className="flex items-center justify-end gap-2 p-2 border-t border-neutral">
        <button
          className="pointer-events-auto text-secondary-content"
          onClick={() => handleAddEmptyLayer()}
        >
          <kbd className="kbd kbd-sm">Add</kbd>
        </button>
        <button
          className="pointer-events-auto text-secondary-content"
          onClick={() => currentLayerId && removeLayer(currentLayerId)}
        >
          <kbd className="kbd kbd-sm">Del</kbd>
        </button>
      </div>
    </div>
  );
};

export default LayerPanel;
