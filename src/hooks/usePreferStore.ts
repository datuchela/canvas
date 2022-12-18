import create from "zustand";

type PreferStore = {
  theme: string;
  setTheme: (newTheme: string) => void;
};

const usePreferStore = create<PreferStore>((set) => ({
  theme: "dark",
  setTheme: (newTheme) =>
    set((state) => ({
      ...state,
      theme: newTheme,
    })),
}));

export default usePreferStore;

export const usePreferences = () =>
  usePreferStore((state) => ({
    ...state,
  }));
