import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import useRenderCanvas from "../hooks/useRenderCanvas";
import { ViaStation } from "../models/Station";
import { TrainType } from "../models/TrainType";
import Image from "next/image";

const MAX_ADDITIONAL_STATION_COUNT = 7;

const mockViaStations: ViaStation[] = [
  {
    name: "高崎問屋町",
  },
  {
    name: "井野",
  },
  {
    name: "新前橋",
  },
  {
    name: "前橋",
  },
  {
    name: "前橋大島",
  },
  {
    name: "駒形",
  },
  {
    name: "伊勢崎",
  },
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BoldAnchor = styled.a`
  font-weight: bold;
`;

const NoticeContainer = styled.div`
  margin: 16px 0;
`;

const Notice = styled.p`
  margin: 0;
  text-align: center;
`;

const Footer = styled.footer`
  text-align: center;
`;

const CopyrightText = styled.p`
  margin: 4px 0;
`;

export default function Home(): React.ReactElement {
  const [trainType, setTrainType] = useState<TrainType>("local");
  const [boundStationName, setBoundStationName] = useState("小山");
  const [stationName, setStationName] = useState("高崎");
  const [lineColor, setLineColor] = useState("#ffd400");
  const [viaStations, setViaStations] = useState<ViaStation[]>(mockViaStations);
  const [addedStationCount, setAddedStationCount] = useState(0);

  const { url } = useRenderCanvas({
    trainType,
    boundStationName: boundStationName?.trim(),
    stationName: stationName?.trim(),
    lineColor,
    viaStations,
  });

  const stationInputArray = Array.from({ length: addedStationCount + 1 })
    .fill(null)
    .map((_, i) => i);

  const handleIncrementStationCount = () =>
    setAddedStationCount((prev) => prev + 1);

  return (
    <Container>
      <Head>
        <title>TrainLCD Image Generator</title>
        <meta
          name="description"
          content="TrainLCD風の画像を生成・ダウンロードできます"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>
        <BoldAnchor
          href="https://trainlcd.tinykitten.me"
          rel="noreferrer noopener"
        >
          TrainLCDアプリ
        </BoldAnchor>
        っぽい画像を作れるジェネレーター系Webアプリ
      </p>
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
      {stationInputArray.map((i) => (
        <input
          type="text"
          key={i}
          value={viaStations[i]?.name}
          onChange={(e) => {
            const slicedViaStations = [...viaStations];
            slicedViaStations[i] = { name: e.currentTarget.value };
            setViaStations(slicedViaStations);
          }}
          placeholder={`${i + 1}駅目の名前(8文字まで)`}
        />
      ))}
      {addedStationCount < MAX_ADDITIONAL_STATION_COUNT - 1 && (
        <button onClick={handleIncrementStationCount}>+</button>
      )}
      <NoticeContainer>
        <Notice>
          今の時点ではおよそ日本語８文字以上の駅名を入力するとはみ出ます。
        </Notice>
        <Notice>
          右クリックで保存できます。
          <BoldAnchor
            href="https://twitter.com/search?q=%23trainlcd"
            rel="noreferrer noopener"
          >
            #TrainLCD
          </BoldAnchor>
          のハッシュタグをつけてツイートしていただけると嬉しいです。
        </Notice>
      </NoticeContainer>
      {url && <Image width={1280} height={720} src={url} alt="result" />}
      <Footer>
        <BoldAnchor
          href="https://github.com/TrainLCD/ImageGenerator"
          rel="noreferrer noopener"
        >
          Fork me on GitHub
        </BoldAnchor>
        <CopyrightText>
          Copyright © 2021{" "}
          <BoldAnchor
            href="https://github.com/TrainLCD/ImageGenerator"
            rel="noreferrer noopener"
          >
            TinyKitten
          </BoldAnchor>
        </CopyrightText>
      </Footer>
    </Container>
  );
}
