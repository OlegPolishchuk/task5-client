import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetData} from "api/types";
import {appApi} from "api";
import {RootState} from "store/store";
import {User} from "store/appReducer/types/types";

export const getData = createAsyncThunk<User[], GetData, {state: RootState}>(
  'app/getUsers',
  async ({seed, region, errorsCount, pageNumber}: GetData, {rejectWithValue}) => {
    try {
      const {data} = await appApi.getUsers({
        region,
        seed,
        errorsCount,
        pageNumber,
      })

      return data;
    }
    catch (e) {
      return rejectWithValue(e)
    }

  }
)