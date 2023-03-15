import { useEffect } from "react";
import { useDraw } from "../../hooks/useDraw";
import { useLayers } from "../../hooks/useLayersStore";
import { useLine } from "../../hooks/useLineStore";
import { drawLine } from "../../utils/drawLine";

type CanvasType = {
	layer: Layer;
	canvasWidth: number;
	canvasHeight: number;
};

const Canvas = ({
	layer,
	canvasWidth,
	canvasHeight,
}: CanvasType) => {
	const { currentLayerId, addLayerRef } = useLayers();
	const { lineWidth, lineColor } = useLine();
	const { canvasRef, onMouseDown } = useDraw(
		createLine,
		layer
	);

	useEffect(() => {
		addLayerRef(canvasRef);
	}, []);

	function createLine({
		prevPoint,
		currentPoint,
		ctx,
	}: Draw) {
		drawLine({
			prevPoint,
			currentPoint,
			ctx,
			lineColor: lineColor,
			lineWidth: lineWidth,
		});
	}

	return (
		<canvas
			className={"top-0 left-0 absolute w-full"}
			style={{
				aspectRatio: canvasWidth / canvasHeight,
				zIndex: layer.z,
				pointerEvents:
					layer.id === currentLayerId ? "auto" : "none",
			}}
			width={canvasWidth}
			height={canvasHeight}
			ref={canvasRef}
			onMouseDown={onMouseDown}
			hidden={layer.hidden}
		/>
	);
};

export default Canvas;
