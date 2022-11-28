import {createAsyncThunk} from "@reduxjs/toolkit";
import {Region, SearchParams, SearchParamsToState} from "store/appReducer/types/types";
import {setSearchParams} from "store/appReducer/appReducer";
import {RootState} from "store/store";

export const setSearchParamsToState = createAsyncThunk<void, SearchParams, {state: RootState}>(
  'app/setSearchParams',
  (searchParams: SearchParams, {dispatch, getState}) => {

    const updatedParams: SearchParamsToState = {
      pageNumber: Number(searchParams.pageNumber),
      seed: Number(searchParams.seed),
      region: searchParams.region ,
      errorsCount: Number(searchParams.errorsCount),
    }

    dispatch(setSearchParams(updatedParams))
  }
)