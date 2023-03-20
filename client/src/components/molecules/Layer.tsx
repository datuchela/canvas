import { useLayers } from "../../hooks/useLayersStore";

const Layer = ({ layer }: { layer: Layer }) => {
  const { setCurrentLayerId, currentLayerId, toggleHidden } = useLayers();
  return (
    <label className="cursor-pointer" htmlFor={layer.id.toString()}>
      <li
        className={`flex items-center justify-between gap-4 p-2 ${
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
          className="checkbox checkbox-accent checkbox-xs pointer-events-auto"
          type="checkbox"
          name="hidden"
          checked={!layer.hidden}
          onChange={() => toggleHidden(layer.id, layer.hidden)}
        />
        <img className="border border-secondary-content max-w-[32px] max-h-8" src={layer?.data} />
        {true ? (
          <span className="flex-1">{layer.name}</span>
        ) : (
          <input type="text" className="flex-1" value={layer.name} />
        )}
      </li>
    </label>
  );
};

export default Layer;
