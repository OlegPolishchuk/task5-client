import {RootState} from "store/store";

export const selectIsFirst = (state: RootState) => state.appReducer.isFirst;