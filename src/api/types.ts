import {Region} from "store/appReducer/types/types";

export type GetUsers = {
  currentRegion: Region;
  errorCount: number;
  seed: number;
  pageNumber: number;
}