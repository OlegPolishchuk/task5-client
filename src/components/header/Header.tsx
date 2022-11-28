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
import {Box, SelectChangeEvent} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {setSearchParamsToState} from "store/appReducer/actions/setSearchParams";
import {DefaultSearchParams} from "constants/defaultSearchParams";
import {DefaultRegion} from "constants/defaultRegion";
import {setCurrentRegion, setPageNumber} from "store/appReducer/appReducer";

export const Header = () => {
  console.log('header')
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = useAppSelector(selectPageNumber);
  // const currentRegion = useAppSelector(selectCurrentRegion);
  const seed = useAppSelector(selectSeed);
  // const errorsCount = useAppSelector(selectErrorCount);

  const pageNumberParam = searchParams.get('pageNumber') || `${DefaultSearchParams.pageNumber}`;
  const currentRegionParam = searchParams.get('region') || DefaultRegion.title;
  const seedParam = searchParams.get('seed') || `${DefaultSearchParams.seed}`;
  const errorsCountParam = searchParams.get('errorsCount') || `${DefaultSearchParams.errorsCount}`;

  // console.log(`pageNumberParam`, pageNumberParam)
  // console.log(`currentRegionParam`, currentRegionParam)
  // console.log(`seedParam`, seedParam)
  // console.log(`errorsCountParam`, errorsCountParam)

  // const handleChangeRegion = (event: SelectChangeEvent) => {
  //   dispatch(setCurrentRegion(event.target.value));
  //   dispatch(setPageNumber(0))
  //
  //   searchParams.set('pageNumber', '0');
  //   searchParams.set('region', event.target.value);
  // }

  console.log(`seedParam`, seedParam)
  console.log('seed from store', seed)

  useEffect(() => {
    dispatch(setSearchParamsToState({
      pageNumber: pageNumberParam,
      errorsCount: errorsCountParam,
      seed: seedParam,
      region: currentRegionParam
    }))
  }, [])

  useEffect(() => {
    dispatch(getData({
      pageNumber: Number(pageNumberParam),
      seed: Number(seedParam),
      errorsCount: Number(errorsCountParam),
      region: currentRegionParam
    }))
  }, [pageNumberParam, seedParam, errorsCountParam, currentRegionParam])

  return (
    <header>
      <Box sx={{
        width: '600px',
        margin: '30px auto',
        padding: '15px',
        boxShadow: 2,
      }}>
        <RegionSelect/>
        <ErrorCounter errorCount={Number(errorsCountParam)}/>
        <SeedControls seed={Number(seedParam)}/>
      </Box>
    </header>
  );
};
