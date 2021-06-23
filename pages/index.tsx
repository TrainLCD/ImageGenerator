import Head from "next/head";
import { useState } from "react";
import useRenderCanvas from "../hooks/useRenderCanvas";
import { TrainType } from "../models/TrainType";
import styles from "../styles/Home.module.css";

export default function Home(): React.ReactElement {
  const [trainType, setTrainType] = useState<TrainType>("local");
  const [boundStationName, setBoundStationName] = useState<string>();
  const [stationName, setStationName] = useState<string>();
  const [lineColor, setLineColor] = useState("#008ffe");

  const { url } = useRenderCanvas({
    trainType,
    boundStationName: boundStationName?.trim(),
    stationName: stationName?.trim(),
    lineColor,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>TrainLCD Image Generator</title>
        <meta
          name="description"
          content="TrainLCD風の画像を生成・ダウンロードできます"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <select
        value={trainType}
        onChange={(e) => setTrainType(e.currentTarget.value as TrainType)}
      >
        <option value="local">各駅停車</option>
        <option value="local2">普通</option>
        <option value="rapid">快速</option>
        <option value="express">急行</option>
      </select>
      <input
        type="text"
        placeholder="行き先"
        value={boundStationName}
        onChange={(e) => setBoundStationName(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="現在の駅"
        value={stationName}
        onChange={(e) => setStationName(e.currentTarget.value)}
      />
      <input
        type="color"
        value={lineColor}
        onChange={(e) => setLineColor(e.currentTarget.value)}
      />
      <p>右クリックで保存できます</p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      {url && <img className={styles.img} id="result" src={url} alt="result" />}
    </div>
  );
}
