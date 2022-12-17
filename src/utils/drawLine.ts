type DrawLineProps = Draw & {
  lineColor: string;
  lineWidth: number;
};

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  lineColor,
  lineWidth,
}: DrawLineProps) => {
  const { x: currX, y: currY } = currentPoint;

  let startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x * 1.5, startPoint.y * 1.5);
  ctx.lineTo(currX * 1.5, currY * 1.5);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(
    startPoint.x * 1.5,
    startPoint.y * 1.5,
    lineWidth / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
};
