import React, {FC} from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {selectCurrentRegion, selectRegions} from "store/selectors";
import {setCurrentRegion, setPageNumber} from "store/appReducer/appReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useSearchParams} from "react-router-dom";

export const RegionSelect = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useSearchParams();

  const regions = useAppSelector(selectRegions);
  const currentRegion = useAppSelector(selectCurrentRegion);

  const handleChangeRegion = (event: SelectChangeEvent) => {
    dispatch(setCurrentRegion(event.target.value));
    dispatch(setPageNumber(0))

    search.set('pageNumber', '0');
    search.set('region', event.target.value);
    setSearch(search);
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
          value={currentRegion}
          onChange={handleChangeRegion}
        >
          {regions.map(region => (
            <MenuItem key={region} value={region}>{region}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};