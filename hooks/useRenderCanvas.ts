import { useEffect, useState } from "react";
import { TrainType } from "../models/TrainType";

type Params = {
  trainType: TrainType;
  boundStationName: string;
  stationName: string;
  lineColor: string;
};

const useRenderCanvas = ({
  trainType = "local",
  boundStationName = "稚内",
  stationName = "新宿",
  lineColor = "#008ffe",
}: Params): { url: string } => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fill();

    const headerBgGradient = ctx.createLinearGradient(0, 0, 0, 200);
    headerBgGradient.addColorStop(0, "#eee");
    headerBgGradient.addColorStop(0.45, "#eee");
    headerBgGradient.addColorStop(0.5, "#dedede");
    headerBgGradient.addColorStop(0.6, "#eee");
    headerBgGradient.addColorStop(0.6, "#eee");
    ctx.fillStyle = headerBgGradient;
    ctx.fillRect(0, 0, 1280, 200);
    const headerBgBottomGradient = ctx.createLinearGradient(0, 0, 0, 10);
    headerBgBottomGradient.addColorStop(0, `${lineColor}aa`);
    headerBgBottomGradient.addColorStop(1, lineColor);

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
    trainTypeBoxGradient.addColorStop(0, `${trainTypeHex}ee`);
    trainTypeBoxGradient.addColorStop(1, `${trainTypeHex}aa`);

    const trainTypeBoxGradientBase = ctx.createLinearGradient(0, 0, 0, 55);
    trainTypeBoxGradientBase.addColorStop(0.5, "#aaa");
    trainTypeBoxGradientBase.addColorStop(0.5, "#000");
    trainTypeBoxGradientBase.addColorStop(0.5, "#000");
    trainTypeBoxGradientBase.addColorStop(0.9, "#aaa");

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
    ctx.textAlign = "center";
    const stationNameFontSize = 64;
    const stationNameTextWidth = ctx.measureText(trainTypeText).width;
    ctx.font = `bold ${stationNameFontSize}px sans-serif`;
    ctx.fillText(
      stationName,
      (canvas.width - stationNameTextWidth) / 1.5,
      150,
      canvas.width - (canvas.width - stationNameTextWidth) / 3
    );

    ctx.fillStyle = "#555";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    const boundStationNameFontSize = 32;
    ctx.font = `bold ${boundStationNameFontSize}px sans-serif`;
    ctx.fillText(`${boundStationName}ゆき`, 200, 37.5, canvas.width);

    ctx.fillStyle = "#212121";
    ctx.textBaseline = "middle";
    const stateFontSize = 32;
    ctx.font = `bold ${stateFontSize}px sans-serif`;
    ctx.fillText("ただいま", 200, 165, canvas.width);

    setUrl(canvas.toDataURL());
  }, [boundStationName, lineColor, stationName, trainType]);

  return { url };
};

export default useRenderCanvas;
