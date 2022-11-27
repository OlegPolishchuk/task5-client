import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialState, Region, User} from "store/appReducer/types/types";
import {getData} from "store/appReducer/actions/getData";
import {AxiosError} from "axios";

const initialState: InitialState = {
  regions: [
    {title: 'USA', locale: 'en_US'},
    {title: 'RUSSIA', locale: 'ru'},
    {title: 'Ukraine', locale: 'uk'},
    {title: 'POLAND', locale: 'pl'},
    {title: 'Germany', locale: 'de'},
    {title: 'Japan', locale: 'ja'}
   ],
  currentRegion: {title: 'USA', locale: 'en_US'},
  errorCount: 0,
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
      const newRegion = action.payload;
      state.currentRegion = state.regions.filter(region => region.title === newRegion)[0];
    },
    setErrorCount: (state, action: PayloadAction<number>) => {
      state.errorCount = action.payload;
    },
    setSeed: (state, action: PayloadAction<number>) => {
      state.seed = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
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
export const {setCurrentRegion, setErrorCount, setSeed, setPageNumber} = appSlice.actions;