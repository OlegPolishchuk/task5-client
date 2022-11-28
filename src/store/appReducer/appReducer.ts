import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState, SearchParamsToState, User} from "store/appReducer/types/types";
import {getData} from "store/appReducer/actions/getData";
import {AxiosError} from "axios";

const initialState: InitialState = {
  regions: ['USA', 'Russia', 'Poland','Ukraine','Germany','Japan'],
  currentRegion: 'USA',
  defaultRegion: 'USA',
  errorsCount: 0,
  seed: 0,
  data: [],
  isLoading: false,
  error: '',
  pageNumber: 0,
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentRegion: (state, action: PayloadAction<string>) => {
      state.currentRegion = action.payload
    },
    setErrorCount: (state, action: PayloadAction<number>) => {
      state.errorsCount = action.payload;
    },
    setSeed: (state, action: PayloadAction<number>) => {
      state.seed = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setDefaultRegion: (state, action: PayloadAction<string>) => {
      state.defaultRegion = action.payload
    },
    setSearchParams: (state, action: PayloadAction<SearchParamsToState>) => {
      state.seed = action.payload.seed;
      state.currentRegion = action.payload.region;
      state.errorsCount = action.payload.errorsCount;
      state.pageNumber = action.payload.pageNumber;
    }
  },

  extraReducers: builder => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<User[]>) => {
      const pageNumber = state.pageNumber;
      state.data = pageNumber === 0 ? action.payload : state.data.concat(action.payload);
      state.isLoading = false;
    })
    builder.addCase(getData.rejected, (state, action) => {
      const error = action.payload as AxiosError;

      state.isLoading = false;
      state.error = error.message;
    })
  }
})

export const appReducer = appSlice.reducer;
export const {
  setCurrentRegion,
  setErrorCount,
  setSeed,
  setPageNumber,
  setSearchParams,
} = appSlice.actions;