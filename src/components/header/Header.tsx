import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {RegionSelect} from "components/regionSelect/RegionSelect";
import {ErrorCounter} from "components/errorCounter/ErrorCounter";
import {SeedControls} from "components/seedControls/seedControls";
import {useAppSelector} from "hooks/useAppSelector";
import {
  selectCurrentRegion,
  selectErrorCount,
  selectPageNumber,
  selectSeed
} from "store/selectors";
import {getData} from "store/appReducer/actions/getData";
import {Box} from "@mui/material";

export const Header = () => {
  console.log('header')
  const dispatch = useAppDispatch();

  const currentRegion = useAppSelector(selectCurrentRegion);
  const errorCount = useAppSelector(selectErrorCount);
  const seed = useAppSelector(selectSeed);
  const pageNumber = useAppSelector(selectPageNumber)

  useEffect(() => {
    dispatch(getData({currentRegion, errorCount, seed, pageNumber}))
  }, [currentRegion, errorCount, seed, pageNumber])

  return (
    <header>
      <Box sx={{
        width: '600px',
        margin: '30px auto',
        padding: '15px',
        boxShadow: 2,
      }}>
        <RegionSelect />
        <ErrorCounter />
        <SeedControls />
      </Box>
    </header>
  );
};
