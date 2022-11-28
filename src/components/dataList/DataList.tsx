import React, {FC, useEffect, useRef} from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import {
  Box, CircularProgress, LinearProgress, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {User} from "store/appReducer/types/types";
import {useAppSelector} from "hooks/useAppSelector";
import {selectData, selectIsLoading, selectPageNumber} from "store/selectors";
import {useInView} from "react-intersection-observer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {setPageNumber} from "store/appReducer/appReducer";
import {useSearchParams} from "react-router-dom";

export const DataList = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const pageNumber = useAppSelector(selectPageNumber);
  const isLoading = useAppSelector(selectIsLoading);

  const [searchParams, setSearchParams] = useSearchParams();

  const {ref, inView, entry} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      dispatch(setPageNumber(pageNumber + 1))

      searchParams.set('pageNumber', `${pageNumber + 1}`)
      setSearchParams(searchParams)
    }
  }, [inView])

  return (
    <TableContainer
      component={Paper}
      sx={{margin: '50px 0'}}
    >

      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataItem, index) => (
            <TableRow
              key={dataItem.id}
              sx={{'&:last-child td, &:last-child th': {border: 0}}}
              ref={index === data.length -1 ? ref : null}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{dataItem.id}</TableCell>
              <TableCell align="right">{dataItem.name}</TableCell>
              <TableCell align="right">{dataItem.address.city}</TableCell>
              <TableCell align="right">{dataItem.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading &&  (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

    </TableContainer>
  );
};
