import React, { useEffect, useState } from "react";

type Line = {
  x: number;
  y: number;
  size?: number;
  color?: string;
  ctx: CanvasRenderingContext2D;
};

const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const [drawing, setDrawing] = useState(true);
  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!drawing) return;
      const { x, y } = computePointInCanvas(e);

      // This could be an issue in future
      if (x === undefined || y === undefined) return;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: undefined, y: undefined };
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [canvasRef]);
};

export default useDraw;
