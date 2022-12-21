import create from "zustand";

type LayersStore = {
  layers: Layer[];
  currentLayerId: number | null;
  addLayer: (layer: Layer) => void;
  removeLayer: (layerId: number) => void;
  setCurrentLayerId: (id: number | null) => void;
  changeLayerBackground: (layerId: number, color: string) => void;
  setLayerData: (layerId: number, data: string) => void;
  toggleHidden: (layerId: number, prevState: boolean) => void;
};

const initialLayer = {
  id: 1,
  name: "Layer 1",
  z: 1,
  hidden: false,
  backgroundColor: "#ffffff",
  ownerId: 1,
};

type OptionalLayerProps = {
  id?: number;
  name?: string;
  data?: string;
  z?: number;
  hidden?: boolean;
  backgroundColor?: string;
  ownerId?: number;
};

const findByIdAndUpdate = (layers: Layer[], layerId: number, payload: OptionalLayerProps) => {
  const layersCopy = [...layers];
  const layerIndex = layersCopy.findIndex((layer) => layer.id === layerId);
  layersCopy[layerIndex] = { ...layersCopy[layerIndex], ...payload };
  return layersCopy;
};

const useLayersStore = create<LayersStore>((set) => ({
  layers: [initialLayer],
  currentLayerId: 1,
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
  changeLayerBackground: (layerId, color) =>
    set((state) => ({
      ...state,
      layers: findByIdAndUpdate(state.layers, layerId, {
        backgroundColor: color,
      }),
    })),
  setLayerData: (layerId, data) =>
    set((state) => ({
      ...state,
      layers: findByIdAndUpdate(state.layers, layerId, { data: data }),
    })),
  toggleHidden: (layerId, prevState) =>
    set((state) => ({
      ...state,
      layers: findByIdAndUpdate(state.layers, layerId, { hidden: !prevState }),
    })),
}));

export default useLayersStore;

export const useLayers = () =>
  useLayersStore((state) => ({
    // layers: state.layers,
    // currentLayerId: state.currentLayerId,
    // addLayer: state.addLayer,
    // removeLayer: state.removeLayer,
    // setCurrentLayerId: state.setCurrentLayerId,
    // changeLayerBackground: state.changeLayerBackground,
    ...state,
  }));
