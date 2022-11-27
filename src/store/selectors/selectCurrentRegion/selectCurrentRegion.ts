import {RootState} from "store/store";

export const selectCurrentRegion = (state: RootState) => state.appReducer.currentRegion;