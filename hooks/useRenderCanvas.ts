import { useEffect, useState } from "react";
import { ViaStation } from "../models/Station";
import { TrainType } from "../models/TrainType";
import Canvg from "canvg";

type Params = {
  trainType: TrainType;
  boundStationName: string;
  stationName: string;
  lineColor: string;
  viaStations: ViaStation[];
};

const useRenderCanvas = ({
  trainType,
  boundStationName,
  stationName,
  lineColor,
  viaStations,
}: Params): { url: string } => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1280, 720);

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
          return "各駅停車";
        case "local2":
          return "普 通";
        case "rapid":
          return "快 速";
        case "express":
          return "急 行";
        default:
          return "各駅停車";
      }
    })();

    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const trainTypeBoxFontSize = 32;
    ctx.font = `bold ${trainTypeBoxFontSize}px sans-serif`;
    ctx.fillText(
      trainTypeText,
      trainTypeBoxX + trainTypeBoxW / 2,
      trainTypeBoxY / 2 + trainTypeBoxFontSize,
      trainTypeBoxW
    );

    const state = "ただいま";
    const stateX = 200;
    const stateY = 165;
    ctx.fillStyle = "#212121";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    const stateFontSize = 32;
    const stateTextWidth = ctx.measureText(state).width;
    ctx.font = `bold ${stateFontSize}px sans-serif`;
    ctx.fillText(state, stateX, stateY, canvas.width);

    ctx.fillStyle = "#212121";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const stationNameFontSize = 64;
    ctx.font = `bold ${stationNameFontSize}px sans-serif`;
    ctx.fillText(
      stationName,
      canvas.width / 1.6,
      150,
      canvas.width - (stateTextWidth + stateX + 30)
    );

    ctx.fillStyle = "#555";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    const boundStationNameFontSize = 32;
    ctx.font = `bold ${boundStationNameFontSize}px sans-serif`;
    ctx.fillText(`${boundStationName}ゆき`, 200, 37.5, canvas.width);

    const barY = canvas.height / 1.5;
    const barW = 1200;
    const barH = 48;

    const barGradient1 = ctx.createLinearGradient(0, barY, 0, barY + barH);
    barGradient1.addColorStop(0.5, "#fff");
    barGradient1.addColorStop(0.5, "#000");
    barGradient1.addColorStop(0.5, "#000");
    barGradient1.addColorStop(0.9, "#fff");
    ctx.fillStyle = barGradient1;
    ctx.fillRect(0, barY, barW, barH);
    const barGradient2 = ctx.createLinearGradient(0, barY, 0, barY + barH);
    barGradient2.addColorStop(0, "#aaaaaaff");
    barGradient2.addColorStop(1, "#aaaaaabb");
    ctx.fillStyle = barGradient2;
    ctx.fillRect(0, barY, barW, barH);
    const barGradient3 = ctx.createLinearGradient(0, barY, 0, barY + barH);
    barGradient3.addColorStop(0.5, "#fff");
    barGradient3.addColorStop(0.5, "#000");
    barGradient3.addColorStop(0.5, "#000");
    barGradient3.addColorStop(0.9, "#fff");
    ctx.fillStyle = barGradient3;
    ctx.fillRect(0, barY, barW, barH);
    const barGradient4 = ctx.createLinearGradient(0, barY, 0, barY + barH);
    barGradient4.addColorStop(0, `${lineColor}ff`);
    barGradient4.addColorStop(1, `${lineColor}bb`);
    ctx.fillStyle = barGradient4;
    ctx.fillRect(0, barY, barW, barH);

    const drawTerminalTriangle = (
      color: string | CanvasGradient | CanvasPattern
    ) => {
      const w = 53;
      ctx.beginPath();
      ctx.moveTo(barW, barY);
      ctx.lineTo(barW, barY + barH);
      ctx.lineTo(barW + w, barY + barH / 2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    drawTerminalTriangle(barGradient1);
    drawTerminalTriangle(barGradient2);
    drawTerminalTriangle(barGradient3);
    drawTerminalTriangle(barGradient4);

    // special thanks: https://codepen.io/phi_jp/pen/rpdaB
    const tategaki = (text: string, x: number, y: number) => {
      const textList = text.split("\n");
      const lineHeight = ctx.measureText("あ").width;
      textList.forEach((elm, i) => {
        Array.prototype.forEach.call(elm, (ch: string, j: number) => {
          ctx.fillText(ch, x - lineHeight * i, y + lineHeight * j);
        });
      });
    };

    [{ name: stationName }, ...viaStations]
      .filter((s) => s.name !== "")
      .forEach((s, i) => {
        const barGradient1 = ctx.createLinearGradient(0, barY, 0, barY + barH);
        barGradient1.addColorStop(0, "#fdfbfb");
        barGradient1.addColorStop(1, "#ebedee");
        ctx.fillStyle = barGradient1;
        const boxW = 48;
        const boxXBase = 64;
        const boxMargin = 96;
        const x = i === 0 ? 0 : (boxW + boxMargin) * i;
        ctx.fillRect(boxXBase + x, barY + 5, boxW, 36);

        const textXBase = 4;
        const textY = canvas.height - s.name.length * 32 - canvas.height / 3;

        ctx.font = `bold 32px sans-serif`;
        ctx.fillStyle = "#212121";
        tategaki(s.name, boxXBase + x + textXBase, textY);
      });

    const v = Canvg.fromString(
      ctx,
      `
    <svg viewBox="0 0 45.59 49">
    <defs>
        <linearGradient
          id="prefix__a"
          x1="22.98"
          y1="12.4"
          x2="22.98"
          y2="36.67"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#3fa9f5" />
          <stop offset="0.5" stop-color="#1d67e0" />
          <stop offset="0.5" stop-color="#333" />
          <stop offset="0.9" stop-color="#1765d4" />
        </linearGradient>
    </defs>
    <path
      stroke="#fff"
      stroke-miterlimit="10"
      fill="url(#prefix__a)"
      d="M27.67.5H.98l17.3 24.06L1.06 48.5h26.69l17.23-23.94L27.67.5z"
    />
    </svg>`
    );

    v.render({
      ignoreClear: true,
      scaleWidth: 3.12,
      offsetX: 640,
      offsetY: 7000,
    });

    setUrl(canvas.toDataURL());

    return () => {
      v.stop();
    };
  }, [boundStationName, lineColor, stationName, trainType, viaStations]);

  return { url };
};

export default useRenderCanvas;
