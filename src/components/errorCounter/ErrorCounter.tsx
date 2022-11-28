import React, {FC, useEffect, useState} from 'react';
import {Box, Grid, Input, Slider, Typography} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {selectErrorCount} from "store/selectors";
import {useAppDispatch} from "hooks/useAppDispatch";
import {setErrorCount} from "store/appReducer/appReducer";
import {useDebounce} from "hooks/useDebounce";
import {useSearchParams} from "react-router-dom";

const MIN_INPUT_VALUE = 0;
const MAX_INPUT_VALUE = 1000;

const MIN_SLIDER_VALUE = 0;
const MAX_SLIDER_VALUE = 10;
const SLIDER_STEP = 0.2;

const DEBOUNCED_DELAY = 500;

type Props = {
  errorCount: number;
}

export const ErrorCounter: FC<Props> = ({errorCount}) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(errorCount);
  const debouncedValue = useDebounce<number>(value, DEBOUNCED_DELAY)

  const valuetext = (value: number) => {
    return `${value}`
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value))
  };

  const handleBlur = () => {
    if (errorCount < MIN_INPUT_VALUE) {
      setErrorCount(MIN_INPUT_VALUE);
    } else if (errorCount > MAX_INPUT_VALUE) {
      setErrorCount(MAX_INPUT_VALUE);
    }
  };

  useEffect(() => {
    dispatch(setErrorCount(value))

    searchParams.set('errorsCount', `${value}`);
    setSearchParams(searchParams);

  }, [debouncedValue])

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end'
    }}>

      <Typography gutterBottom>
        Error count:
      </Typography>

      <Box sx={{
        width: '400px',
        ml: '30px',
        mb: '30px',
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={value}
              onChange={handleSliderChange}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              marks
              min={MIN_SLIDER_VALUE}
              max={MAX_SLIDER_VALUE}
              step={SLIDER_STEP}
            />
          </Grid>
          <Grid item>
            <Input
              value={value}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: MIN_INPUT_VALUE,
                max: MAX_INPUT_VALUE,
                type: 'number',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
