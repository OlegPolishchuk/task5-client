import React, {useEffect} from 'react';
import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {useAppSelector} from "hooks/useAppSelector";
import {
  selectData,
  selectIsLoading,
  selectPageNumber,
  selectStartDataListNumber
} from "store/selectors";
import {useInView} from "react-intersection-observer";
import {useAppDispatch} from "hooks/useAppDispatch";
import {setPageNumber} from "store/appReducer/appReducer";
import {useSearchParams} from "react-router-dom";
import {downloadCSV} from "store/appReducer/actions/downloadCSV";

export const DataList = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(selectData);
  const pageNumber = useAppSelector(selectPageNumber);
  const isLoading = useAppSelector(selectIsLoading);
  const startListNumber = useAppSelector(selectStartDataListNumber);

  const [searchParams, setSearchParams] = useSearchParams();

  const {ref, inView} = useInView({
    threshold: 0,
  });

  const handleDownloadCSV = () => {
    dispatch(downloadCSV());
  }

  useEffect(() => {
    if (inView) {
      dispatch(setPageNumber(pageNumber + 1))

      searchParams.set('pageNumber', `${pageNumber + 1}`)
      setSearchParams(searchParams)
    }
  }, [inView])

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: '50px 0',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'scroll',
        }}
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
                key={`${dataItem.id}_${dataItem.name}`}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                ref={index === data.length - 1 ? ref : null}
              >
                <TableCell component="th" scope="row">
                  {startListNumber + index}
                </TableCell>
                <TableCell align="right">{dataItem.id}</TableCell>
                <TableCell align="right">{dataItem.name}</TableCell>
                <TableCell align="right">{dataItem.address}</TableCell>
                <TableCell align="right">{dataItem.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isLoading && (
          <Box sx={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        )}

      </TableContainer>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50px',
      }}>
        <Button
          variant={'outlined'}
          onClick={handleDownloadCSV}
        >
          DOWNLOAD CSV
        </Button>
      </Box>
    </>
  );
};
