import { useLayers } from "../hooks/useLayersStore";
import { useLine } from "../hooks/useLineStore";

const Toolbar = () => {
  const { currentLayerId, changeLayerBackground } = useLayers();
  const { lineColor, lineWidth, setLineColor, setLineWidth } = useLine();
  return (
    <header className="px-8 py-4 border-b border-neutral">
      <div className="flex items-center gap-12">
        <input
          type="color"
          className="w-6 h-6 bg-transparent cursor-pointer"
          name="lineColor"
          id="lineColor"
          value={lineColor}
          onChange={(e) => setLineColor(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="min-w-[6ch] max-w-[6ch] px-1"
            min={1}
            max={64}
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
            required
          />
          <input
            type="range"
            // className="w-24"
            name="lineWidth"
            id="lineWidth"
            min={1}
            max={64}
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
          />
        </div>
        <button
          className="btn btn-sm"
          onClick={() => changeLayerBackground(currentLayerId, lineColor)}
        >
          Fill
        </button>
        <button
          className="btn btn-sm"
          onClick={() => changeLayerBackground(currentLayerId, lineColor)}
        >
          Clear
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
