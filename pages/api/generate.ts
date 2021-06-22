import type { NextApiRequest, NextApiResponse } from "next";
import { createCanvas } from "canvas";

export type PermittedPayload = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(404);
  }
  const canvas = createCanvas(1280, 720);
  const ctx = canvas.getContext("2d");

  const headerBgGradient = ctx.createLinearGradient(0, 0, 0, 200);
  headerBgGradient.addColorStop(0, "rgb(238, 238, 238)");
  headerBgGradient.addColorStop(0.45, "rgb(238, 238, 238)");
  headerBgGradient.addColorStop(0.5, "rgb(222, 222, 222)");
  headerBgGradient.addColorStop(0.6, "rgb(238, 238, 238)");
  headerBgGradient.addColorStop(0.6, "rgb(238, 238, 238)");
  ctx.fillStyle = headerBgGradient;
  ctx.fillRect(0, 0, 1280, 200);

  const trainTypeBoxGradient = ctx.createLinearGradient(0, 0, 0, 55);
  trainTypeBoxGradient.addColorStop(0, "rgba(220, 20, 60, 0.93)");
  trainTypeBoxGradient.addColorStop(1, "rgba(220, 20, 60, 0.67)");

  const trainTypeBoxGradientBase = ctx.createLinearGradient(0, 0, 0, 55);
  trainTypeBoxGradientBase.addColorStop(0.5, "rgb(170, 170, 170)");
  trainTypeBoxGradientBase.addColorStop(0.5, "rgb(0, 0, 0)");
  trainTypeBoxGradientBase.addColorStop(0.5, "rgb(0, 0, 0)");
  trainTypeBoxGradientBase.addColorStop(0.9, "rgb(170, 170, 170)");

  const drawArcRect = (
    x: number,
    y: number,
    r: number,
    w: number,
    h: number,
    color: string | CanvasGradient | CanvasPattern
  ) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.moveTo(x, y + r);
    ctx.arc(x + r, y + h - r, r, Math.PI, Math.PI * 0.5, true);
    ctx.arc(x + w - r, y + h - r, r, Math.PI * 0.5, 0, true);
    ctx.arc(x + w - r, y + r, r, 0, Math.PI * 1.5, true);
    ctx.arc(x + r, y + r, r, Math.PI * 1.5, Math.PI, true);
    ctx.closePath();
    ctx.fill();
  };

  const trainTypeBoxR = 5;
  const trainTypeBoxW = 175;
  const trainTypeBoxH = 55;
  const trainTypeBoxX = 12;
  const trainTypeBoxY = 12;

  drawArcRect(
    trainTypeBoxX,
    trainTypeBoxY,
    trainTypeBoxR,
    trainTypeBoxW,
    trainTypeBoxH,
    trainTypeBoxGradientBase
  );
  drawArcRect(
    trainTypeBoxX,
    trainTypeBoxY,
    trainTypeBoxR,
    trainTypeBoxW,
    trainTypeBoxH,
    trainTypeBoxGradient
  );

  const mockTrainTypeText = "快 速";
  ctx.fillStyle = "white";
  ctx.textBaseline = "middle";
  const trainTypeBoxFontSize = 32;
  const textWidth = ctx.measureText(mockTrainTypeText).width;

  ctx.font = `bold ${trainTypeBoxFontSize}px sans-serif`;
  ctx.fillText(
    mockTrainTypeText,
    (trainTypeBoxW - textWidth) / 2 - trainTypeBoxX,
    trainTypeBoxY / 2 + trainTypeBoxFontSize,
    trainTypeBoxW
  );

  res.setHeader("Content-Type", "image/png");

  res.status(200).json(canvas.toDataURL());
}
