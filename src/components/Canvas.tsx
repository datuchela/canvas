import { useEffect } from "react";
import { useDraw } from "../hooks/useDraw";
import { useLayers } from "../hooks/useLayersStore";
import { useLine } from "../hooks/useLineStore";
import { drawLine } from "../utils/drawLine";

type CanvasType = {
  layer: Layer;
};

const Canvas = ({ layer }: CanvasType) => {
  const { currentLayerId, setLayerData } = useLayers();
  const { lineWidth, lineColor } = useLine();
  const { canvasRef, onMouseDown } = useDraw(createLine, layer);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    drawLine({
      prevPoint,
      currentPoint,
      ctx,
      lineColor: lineColor,
      lineWidth: lineWidth,
    });
  }

  // useEffect(() => {
  //   const updateImageData = () => {
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;
  //     const dataURL = canvas.toDataURL();
  //     setLayerData(layer.id, dataURL);
  //   };
  //   window.addEventListener("mouseup", updateImageData);

  //   return () => {
  //     window.removeEventListener("mouseup", updateImageData);
  //   };
  // }, [canvasRef]);

  return (
    <canvas
      className={"top-0 left-0 absolute aspect-video w-full"}
      style={{
        zIndex: layer.z,
        pointerEvents: layer.id === currentLayerId ? "auto" : "none",
      }}
      width={1920}
      height={1080}
      ref={canvasRef}
      onMouseDown={onMouseDown}
    />
  );
};

export default Canvas;
