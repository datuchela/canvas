import { useLayers } from "../hooks/useLayersStore";
import { useLine } from "../hooks/useLineStore";
import { usePreferences } from "../hooks/usePreferStore";

const themes = [
	// "light",
	"dark",
	// "cupcake",
	// "bumblebee",
	// "emerald",
	// "corporate",
	// "synthwave",
	// "retro",
	// "cyberpunk",
	// "valentine",
	// "halloween",
	// "garden",
	// "forest",
	// "aqua",
	// "lofi",
	"pastel",
	// "fantasy",
	"wireframe",
	// "black",
	// "luxury",
	// "dracula",
	// "cmyk",
	// "autumn",
	// "business",
	// "acid",
	// "lemonade",
	// "night",
	// "coffee",
	// "winter",
];

const Toolbar = () => {
	const { theme, setTheme } = usePreferences();
	const {
		currentLayerId,
		changeLayerBackground,
		layerRefs,
	} = useLayers();
	const {
		lineColor,
		lineWidth,
		setLineColor,
		setLineWidth,
	} = useLine();

	function handleExport() {
		const exportCanvas = document.createElement("canvas");

		exportCanvas.width = layerRefs[0].current?.width ?? 0;
		exportCanvas.height = layerRefs[0].current?.height ?? 0;

		const ctx = exportCanvas.getContext("2d");
		if (!ctx) return;

		layerRefs.forEach((layerRef) => {
			const layer = layerRef.current;
			if (!layer) return;
			ctx.drawImage(layer, 0, 0);
		});

		const link = document.createElement("a");
		link.download = "artwork.png";
		link.href = exportCanvas.toDataURL("image/png");
		link.click();
	}

	return (
		<header className="px-8 py-4 border-b border-neutral flex items-center justify-between">
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
						onChange={(e) =>
							setLineWidth(parseInt(e.target.value))
						}
						required
					/>
					<input
						type="range"
						className="range range-xs"
						name="lineWidth"
						id="lineWidth"
						min={1}
						max={64}
						value={lineWidth}
						onChange={(e) =>
							setLineWidth(parseInt(e.target.value))
						}
					/>
				</div>
				<button
					className="btn btn-sm"
					onClick={() =>
						currentLayerId &&
						changeLayerBackground(currentLayerId, lineColor)
					}
				>
					Fill
				</button>
				<button
					className="btn btn-sm"
					onClick={handleExport}
				>
					Export PNG
				</button>
			</div>
			<div>
				<select
					className="select select-bordered select-sm"
					name="theme"
					value={theme}
					onChange={(e) => setTheme(e.target.value)}
				>
					{themes.map((themeName) => (
						<option
							key={themeName}
							value={themeName}
						>
							{themeName}
						</option>
					))}
				</select>
			</div>
		</header>
	);
};

export default Toolbar;
