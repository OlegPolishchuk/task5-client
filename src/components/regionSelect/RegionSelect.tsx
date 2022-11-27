import React, {useEffect} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {selectCurrentRegion, selectRegions} from "store/selectors";
import {setCurrentRegion} from "store/appReducer/appReducer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useSearchParams} from "react-router-dom";

export const RegionSelect = () => {
  const dispatch = useAppDispatch();

  // const [searchParams, setSearchParams] = useSearchParams();

  const regions = useAppSelector(selectRegions);
  const currentRegion = useAppSelector(selectCurrentRegion);

  const handleChangeRegion = (event: SelectChangeEvent) => {
    dispatch(setCurrentRegion(event.target.value));
  }

  // useEffect(() => {
  //   searchParams.set('region', currentRegion.title);
  //   searchParams.set('locale', currentRegion.locale);
  //
  //   setSearchParams(searchParams);
  // }, [currentRegion])

  return (
    <FormControl fullWidth>
      <Select
        value={currentRegion.title}
        label="Region"
        onChange={handleChangeRegion}
      >
        {regions.map(region => (
          <MenuItem key={region.title} value={region.title}>{region.title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};