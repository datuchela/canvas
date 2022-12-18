import { useEffect, useRef, useState } from "react";
import { useLayers } from "./useLayersStore";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
  layer: Layer
) => {
  //useLayers
  const { setLayerData } = useLayers();

  // useState
  const [mouseDown, setMouseDown] = useState(false);

  // useRefs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = () => setMouseDown(true);

  // Clear canvas
  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Sets background / fills layer with color
  useEffect(() => {
    if (!layer) return;
    if (!layer.backgroundColor) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = layer.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    setLayerData(layer.id, dataURL);
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [layer.backgroundColor]);

  //
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    // Add event listeners
    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw]);

  useEffect(() => {
    const updateImageData = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas?.toDataURL();
      setLayerData(layer.id, dataURL ? dataURL : "");
    };

    updateImageData();
  }, [mouseDown]);

  return { canvasRef, onMouseDown, clear };
};
