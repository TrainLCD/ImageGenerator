import type { NextApiRequest, NextApiResponse } from "next";
import { createCanvas } from "canvas";

export type PermittedPayload = {
  trainType: "local" | "rapid" | "express";
  boundStationName: string;
  stationName: string;
  lineColor: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404);
  }

  const {
    trainType = "local",
    boundStationName = "稚内",
    stationName = "新宿",
    lineColor = "#008ffe",
  } = JSON.parse(req.body) as PermittedPayload;

  const hex2rgb = (hex: string) => {
    if (hex.slice(0, 1) == "#") hex = hex.slice(1);
    if (hex.length == 3)
      hex =
        hex.slice(0, 1) +
        hex.slice(0, 1) +
        hex.slice(1, 2) +
        hex.slice(1, 2) +
        hex.slice(2, 3) +
        hex.slice(2, 3);

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (
      str
    ) {
      return parseInt(str, 16);
    });
  };

  const canvas = createCanvas(1280, 720);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "white";
  ctx.fill();

  const headerBgGradient = ctx.createLinearGradient(0, 0, 0, 200);
  headerBgGradient.addColorStop(0, "rgb(238, 238, 238)");
  headerBgGradient.addColorStop(0.45, "rgb(238, 238, 238)");
  headerBgGradient.addColorStop(0.5, "rgb(222, 222, 222)");
  headerBgGradient.addColorStop(0.6, "rgb(238, 238, 238)");
  headerBgGradient.addColorStop(0.6, "rgb(238, 238, 238)");
  ctx.fillStyle = headerBgGradient;
  ctx.fillRect(0, 0, 1280, 200);
  const headerBgBottomGradient = ctx.createLinearGradient(0, 0, 0, 10);
  headerBgBottomGradient.addColorStop(
    0,
    `rgba(${hex2rgb(lineColor).join(",")} 0.93)`
  );
  headerBgBottomGradient.addColorStop(
    1,
    `rgba(${hex2rgb(lineColor).join(",")}, 0.67)`
  );

  ctx.fillStyle = headerBgBottomGradient;
  ctx.fillRect(0, 200, 1280, 10);

  const trainTypeHex = (() => {
    switch (trainType) {
      case "local":
        return "#1f63c6";
      case "rapid":
        return "#dc143c";
      case "express":
        return "#dc143c";
      default:
        return "#1f63c6";
    }
  })();

  const trainTypeBoxGradient = ctx.createLinearGradient(0, 0, 0, 55);
  trainTypeBoxGradient.addColorStop(
    0,
    `rgba(${hex2rgb(trainTypeHex).join(",")} 0.93)`
  );
  trainTypeBoxGradient.addColorStop(
    1,
    `rgba(${hex2rgb(trainTypeHex).join(",")}, 0.67)`
  );

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

  const trainTypeText = (() => {
    switch (trainType) {
      case "local":
        return "普 通";
      case "rapid":
        return "快 速";
      case "express":
        return "急 行";
      default:
        return "普 通";
    }
  })();

  ctx.fillStyle = "white";
  ctx.textBaseline = "middle";
  const trainTypeBoxFontSize = 32;
  const trainTypeBoxTextWidth = ctx.measureText(trainTypeText).width;
  ctx.font = `bold ${trainTypeBoxFontSize}px sans-serif`;
  ctx.fillText(
    trainTypeText,
    (trainTypeBoxW - trainTypeBoxTextWidth) / 2 - trainTypeBoxX,
    trainTypeBoxY / 2 + trainTypeBoxFontSize,
    trainTypeBoxW
  );

  ctx.fillStyle = "#212121";
  ctx.textBaseline = "middle";
  const stationNameFontSize = 64;
  const stationNameTextWidth = ctx.measureText(trainTypeText).width;
  ctx.font = `bold ${stationNameFontSize}px sans-serif`;
  ctx.fillText(
    stationName,
    (canvas.width - stationNameTextWidth) / 2,
    150,
    canvas.width
  );

  ctx.fillStyle = "#555";
  ctx.textBaseline = "middle";
  const boundStationNameFontSize = 32;
  ctx.font = `bold ${boundStationNameFontSize}px sans-serif`;
  ctx.fillText(`${boundStationName}ゆき`, 200, 37.5, canvas.width);

  ctx.fillStyle = "#212121";
  ctx.textBaseline = "middle";
  const stateFontSize = 32;
  ctx.font = `bold ${stateFontSize}px sans-serif`;
  ctx.fillText("ただいま", 200, 165, canvas.width);

  res.setHeader("Content-Type", "image/png");

  res.status(200).json(canvas.toDataURL());
}
