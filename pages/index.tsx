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

const ShortDescription = styled.p`
  margin: 0;
`;

const Container = styled.div`
  padding: 16px;
`;

const BoldAnchor = styled.a`
  font-weight: bold;
`;

const NoticeContainer = styled.div`
  margin: 16px 0;
`;

const Notice = styled.p`
  margin: 0;
`;

const Footer = styled.footer`
  text-align: center;
`;

const CopyrightText = styled.p`
  margin: 4px 0;
`;

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ColorContainer = styled.div`
  display: flex;
`;

const InvalidColorText = styled.p`
  color: crimson;
  margin: 0;
`;

export default function Home(): React.ReactElement {
  const [trainType, setTrainType] = useState<TrainType>("local");
  const [boundStationName, setBoundStationName] = useState("小山");
  const [stationName, setStationName] = useState("高崎");
  const [lineColor, setLineColor] = useState("#ffd400");
  const [viaStations, setViaStations] = useState<ViaStation[]>(mockViaStations);

  const testColorHex = (color: string) => /^#[0-9A-F]{6}$/i.test(color);

  const { url } = useRenderCanvas({
    trainType,
    boundStationName: boundStationName?.trim(),
    stationName: stationName?.trim(),
    lineColor: testColorHex(lineColor) ? lineColor : "#000000",
    viaStations,
  });

  const stationInputArray = Array.from({ length: MAX_ADDITIONAL_STATION_COUNT })
    .fill(null)
    .map((_, i) => i);

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
      <ControlPanel>
        <ShortDescription>
          <BoldAnchor
            href="https://trainlcd.tinykitten.me"
            rel="noreferrer noopener"
          >
            TrainLCDアプリ
          </BoldAnchor>
          っぽい画像を作れるジェネレーター系Webアプリ
        </ShortDescription>
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
        <ColorContainer>
          <input
            type="color"
            value={lineColor}
            onChange={(e) => setLineColor(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="カラーコード(HEX)"
            value={lineColor}
            onChange={(e) => setLineColor(e.currentTarget.value)}
          />
        </ColorContainer>
        {testColorHex(lineColor) ? null : (
          <InvalidColorText>カラーコードが正しくありません</InvalidColorText>
        )}
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
      </ControlPanel>
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
