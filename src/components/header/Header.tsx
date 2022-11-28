import React, {useEffect} from 'react';
import {useAppDispatch} from "hooks/useAppDispatch";
import {RegionSelect} from "components/regionSelect/RegionSelect";
import {ErrorCounter} from "components/errorCounter/ErrorCounter";
import {SeedControls} from "components/seedControls/seedControls";
import {getData} from "store/appReducer/actions/getData";
import {Box} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {setSearchParamsToState} from "store/appReducer/actions/setSearchParams";
import {DefaultSearchParams} from "constants/defaultSearchParams";
import {DefaultRegion} from "constants/defaultRegion";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const pageNumberParam = searchParams.get('pageNumber') || `${DefaultSearchParams.pageNumber}`;
  const currentRegionParam = searchParams.get('region') || DefaultRegion.title;
  const seedParam = searchParams.get('seed') || `${DefaultSearchParams.seed}`;
  const errorsCountParam = searchParams.get('errorsCount') || `${DefaultSearchParams.errorsCount}`;

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
