export type InitialState = {
  regions: Region[];
  currentRegion: Region;
  errorCount: number;
  seed: number;
  data: User[];
  isLoading: boolean;
  error: string;
  pageNumber: number;
}

export type Region = {
  title: string;
  locale: string;
}


export type User = {
  id: string;
  name: string,
  address: {
    city: string;
    street: string;
    zipCode: string;
    timeZone: string;
  },
  phoneNumber: string;
}