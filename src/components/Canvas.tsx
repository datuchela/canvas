import { useRef } from "react";
import useDraw from "../hooks/useDraw";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDraw(canvasRef);

  return (
    <canvas
      className={"border border-white"}
      width={500}
      height={500}
      ref={canvasRef}
    />
  );
};

export default Canvas;
