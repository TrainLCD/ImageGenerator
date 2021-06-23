type Line = {
  mark?: string;
  color: string;
  name: string;
};

export type ViaStation = {
  name: string;
  lines?: Line[];
  pass?: boolean;
};
