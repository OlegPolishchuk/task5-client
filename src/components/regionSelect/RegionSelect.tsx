import React, {useEffect} from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent, Typography
} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {selectCurrentRegion, selectRegions} from "store/selectors";
import {setCurrentRegion} from "store/appReducer/appReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useSearchParams} from "react-router-dom";

export const RegionSelect = () => {
  const dispatch = useAppDispatch();

  const regions = useAppSelector(selectRegions);
  const currentRegion = useAppSelector(selectCurrentRegion);

  const handleChangeRegion = (event: SelectChangeEvent) => {
    dispatch(setCurrentRegion(event.target.value));
  }


  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      padding: '30px 0',
    }}>
      <Typography>
        Chose Region:
      </Typography>
      <FormControl sx={{minWidth: '300px', ml: '30px'}}>
        <Select
          value={currentRegion.title}
          onChange={handleChangeRegion}
        >
          {regions.map(region => (
            <MenuItem key={region.title} value={region.title}>{region.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};