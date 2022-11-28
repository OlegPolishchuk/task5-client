export type InitialState = {
  regions: string[];
  currentRegion: string;
  errorsCount: number;
  seed: number;
  data: User[];
  isLoading: boolean;
  error: string;
  pageNumber: number;
  defaultRegion: string;
}

export type Region = {
  title: string;
  locale: string;
}


export type User = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export type SearchParams = {
  pageNumber: string;
  region: string;
  seed: string;
  errorsCount: string;
}

export type SearchParamsToState = {
  pageNumber: number;
  region: string;
  seed: number;
  errorsCount: number;
}