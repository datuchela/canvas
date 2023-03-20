type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

type Layer = {
  id: number;
  name: string;
  data?: string;
  z: number;
  hidden: boolean;
  backgroundColor?: string;
  ownerId: number;
};
