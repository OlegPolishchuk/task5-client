import {createAsyncThunk} from "@reduxjs/toolkit";
import {appApi} from "api";

export const downloadCSV = createAsyncThunk(
  'app/downloadCSV', async (_,{rejectWithValue}) => {
    try {
      const {data} = await appApi.downloadCSV();

      const blob = new Blob([data], {type: 'text/plain',});
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;

      link.setAttribute('download', 'data.csv');

      document.body.appendChild(link);

      link.click();

      link.remove();
    }
    catch (e) {
      return rejectWithValue(e)
    }
  }
)