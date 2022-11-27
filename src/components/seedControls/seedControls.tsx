import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Button, Input, Typography} from "@mui/material";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useDebounce} from "hooks/useDebounce";
import {setSeed} from "store/appReducer/appReducer";
import {getRandomInRange} from "utils/getRandomInRange";
import {useAppSelector} from "hooks/useAppSelector";
import {selectSeed} from "store/selectors";

const MIN_SEED_RANGE_VALUE = 1;
const MAX_SEED_RANGE_VALUE = 100000;
const DEBOUNCED_DELAY = 500;

export const SeedControls = React.memo( () => {
  const dispatch = useAppDispatch();

  const seed = useAppSelector(selectSeed);

  const [value, setValue] = useState(seed);
  const debouncedValue = useDebounce<number>(value, DEBOUNCED_DELAY)

  const handleSeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);

    setValue(isNaN(value) ? 0 : value)
  }

  const handleGetRandomData = () => {
    const randomValue = getRandomInRange(MIN_SEED_RANGE_VALUE, MAX_SEED_RANGE_VALUE);

    setValue(randomValue)
  }

  useEffect(() => {
    dispatch(setSeed(value));

  }, [debouncedValue])

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}>
      <Typography>
        Seed:
      </Typography>

      <Box sx={{ml: '30px'}}>
        <Input
          value={value}
          onChange={handleSeedChange}
        />

        <Button
          variant={'outlined'}
          onClick={handleGetRandomData}
        >
          Random
        </Button>
      </Box>

    </Box>
  );
});
