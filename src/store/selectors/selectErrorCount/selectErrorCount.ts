import {RootState} from "store/store";

export const selectErrorCount = (state: RootState) => state.appReducer.errorsCount