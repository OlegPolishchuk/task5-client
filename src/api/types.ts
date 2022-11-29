export type GetData = {
  region: string;
  errorsCount: number;
  seed: number;
  pageNumber: number;
  isFirst: boolean;
}

export type GetDataThunk = {
  region: string;
  errorsCount: number;
  seed: number;
  pageNumber: number;
}