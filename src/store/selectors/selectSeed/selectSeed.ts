import {RootState} from "store/store";

export const selectSeed = (state: RootState) => state.appReducer.seed;