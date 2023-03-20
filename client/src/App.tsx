import { useEffect, useState } from "react";
import Canvas from "./components/molecules/Canvas";
import LayerPanel from "./components/LayerPanel";
import Toolbar from "./components/Toolbar";
import { useLayers } from "./hooks/useLayersStore";
import { usePreferences } from "./hooks/usePreferStore";

export const pixelDensity = 1.5;

function FrameSize({
  setFrameSize,
}: {
  setFrameSize: React.Dispatch<{ width: number; height: number }>;
}) {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  return (
    <form
      className="flex flex-col gap-4 items-center justify-center min-h-screen"
      onSubmit={(e) => {
        e.preventDefault();
        if (!width || !height) return;
        setFrameSize({ width: width, height: height });
      }}
    >
      <label htmlFor="width">width:</label>
      <input type="number" name="width" onChange={(e) => setWidth(parseInt(e.target.value))} />
      <label htmlFor="height">height:</label>
      <input type="number" name="height" onChange={(e) => setHeight(parseInt(e.target.value))} />
      <button>Get Started</button>
    </form>
  );
}

function App() {
  const [frameSize, setFrameSize] = useState<{ width: number; height: number }>();
  const { theme } = usePreferences();
  const { layers } = useLayers();

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    htmlElement?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      {!frameSize ? (
        <FrameSize setFrameSize={setFrameSize} />
      ) : (
        <>
          <Toolbar />
          <div className="p-8 flex justify-between w-full">
            <div
              className="relative border border-neutral overflow-hidden"
              style={{
                aspectRatio: frameSize.width / frameSize.height,
                width: `${frameSize.width / pixelDensity}px`,
                height: `${frameSize.height / pixelDensity}px`,
              }}
            >
              {layers?.map((layer) => (
                <Canvas
                  key={layer.id}
                  layer={layer}
                  canvasWidth={frameSize?.width}
                  canvasHeight={frameSize?.height}
                />
              ))}
            </div>
            <LayerPanel />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
