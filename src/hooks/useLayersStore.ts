import create from "zustand";

type Layer = {
  id: number;
  name: string;
  z: number;
  hidden: boolean;
  ownerId: number;
};

type LayersStore = {
  layers: Layer[];
  currentLayerId: number;
  addLayer: (layer: Layer) => void;
  removeLayer: (layerId: number) => void;
  setCurrentLayerId: (id: number) => void;
};

const initialLayer = {
  id: 0,
  name: "Layer 1",
  z: 1,
  hidden: false,
  ownerId: 1,
};

const useLayersStore = create<LayersStore>((set) => ({
  layers: [initialLayer],
  currentLayerId: 0,
  addLayer: (layer) =>
    set((state) => ({
      ...state,
      layers: [layer, ...state.layers],
    })),
  removeLayer: (layerId) =>
    set((state) => ({
      ...state,
      layers: state.layers.filter((layer) => layer.id !== layerId),
    })),
  setCurrentLayerId: (id) =>
    set((state) => ({
      ...state,
      currentLayerId: id,
    })),
}));

export default useLayersStore;

export const useLayers = () =>
  useLayersStore((state) => ({
    layers: state.layers,
    currentLayerId: state.currentLayerId,
    addLayer: state.addLayer,
    removeLayer: state.removeLayer,
    setCurrentLayerId: state.setCurrentLayerId,
  }));
