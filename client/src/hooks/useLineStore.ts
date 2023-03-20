import create from "zustand";

type LineStore = {
  lineColor: string;
  lineWidth: number;
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
};

const useLineStore = create<LineStore>((set) => ({
  lineColor: "#000000",
  lineWidth: 7,
  setLineColor: (color) =>
    set((state) => ({
      ...state,
      lineColor: color,
    })),
  setLineWidth: (width) =>
    set((state) => ({
      ...state,
      lineWidth: width,
    })),
}));

export default useLineStore;

export const useLine = () =>
  useLineStore((state) => ({
    ...state,
  }));
