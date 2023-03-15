import { pixelDensity } from "../App";

type DrawLineProps = Draw & {
  lineColor: string;
  lineWidth: number;
};

export const drawLine = ({ prevPoint, currentPoint, ctx, lineColor, lineWidth }: DrawLineProps) => {
  const { x: currX, y: currY } = currentPoint;

  let startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x * pixelDensity, startPoint.y * pixelDensity);
  ctx.lineTo(currX * pixelDensity, currY * pixelDensity);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startPoint.x * pixelDensity, startPoint.y * pixelDensity, lineWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
};
