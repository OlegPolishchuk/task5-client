import {createAsyncThunk} from "@reduxjs/toolkit";
import {GetUsers} from "api/types";
import {appApi} from "api";

export const getData = createAsyncThunk(
  'app/getUsers',
  async ({seed, currentRegion, errorCount, pageNumber}: GetUsers, {rejectWithValue}) => {

    try {
      const {data} = await appApi.getUsers({
        currentRegion,
        seed,
        errorCount,
        pageNumber,
      })

      return data;
    }
    catch (e) {
      return rejectWithValue(e)
    }

  }
)