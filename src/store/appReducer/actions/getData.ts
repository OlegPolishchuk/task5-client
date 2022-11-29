import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetData, GetDataThunk} from "api/types";
import {appApi} from "api";
import {RootState} from "store/store";
import {User} from "store/appReducer/types/types";

export const getData = createAsyncThunk<User[], GetDataThunk, {state: RootState}>(
  'app/getUsers',
  async ({seed, region, errorsCount, pageNumber}: GetDataThunk, {getState,rejectWithValue}) => {
    try {
      const isFirst = getState().appReducer.isFirst;

      const {data} = await appApi.getUsers({
        region,
        seed,
        errorsCount,
        pageNumber,
        isFirst
      })

      return data;
    }
    catch (e) {
      return rejectWithValue(e)
    }

  }
)