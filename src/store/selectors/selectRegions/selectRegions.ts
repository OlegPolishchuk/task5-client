import {RootState} from "store/store";

export const selectRegions = (state: RootState) => state.appReducer.regions;