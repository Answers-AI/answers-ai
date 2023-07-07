'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import { visuallyHidden } from '@mui/utils';

import { Order, getComparator, stableSort } from '@utils/utilities/datatables';
import { AppSettings, Sidekick } from 'types';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const fetchStarAPI = (id: string) => {
  // TODO: Implement this
  // fetch(`API_ENDPOINT/star/${id}`)
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error('Error:', error));
};

interface HeadCell {
  disablePadding: boolean;
  id: keyof Sidekick;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'label',
    numeric: false,
    disablePadding: true,
    label: 'Label'
  },
  {
    id: 'placeholder',
    numeric: false,
    disablePadding: false,
    label: 'Help Text'
  },
  {
    id: 'tags',
    numeric: false,
    disablePadding: false,
    label: 'Tags'
  },
  {
    id: 'sharedWith',
    numeric: false,
    disablePadding: false,
    label: 'Shared With'
  }
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Sidekick) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Sidekick) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const SidekickList = ({ appSettings }: { appSettings: AppSettings }) => {
  const [sidekicks, setSidekicks] = useState<Sidekick[]>([]);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Sidekick>('label');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  useEffect(() => {
    const fetchSidekicks = async () => {
      try {
        const response = await axios.get('/api/sidekicks');
        setSidekicks(response.data);
      } catch (error) {
        console.error('Error fetching sidekicks:', error);
      }
    };

    fetchSidekicks();
  }, []);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Sidekick) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sidekicks.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(sidekicks as any[], getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, sidekicks]
  );

  return (
    <Box p={8}>
      <Typography variant="h2" component="h1">
        Sidekicks
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <NextLink href="/sidekick-studio/new" passHref>
          <Button variant="outlined">Add New Sidekick</Button>
        </NextLink>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.label} sx={{ cursor: 'pointer' }}>
                    <TableCell padding="checkbox">
                      <IconButton onClick={() => fetchStarAPI(row.id as string)}>
                        <StarIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <NextLink href={`/sidekick-studio/${row.id}`}>{row.label}</NextLink>
                    </TableCell>
                    <TableCell>{row.placeholder}</TableCell>
                    <TableCell>{row.tags}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{row.sharedWith}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={sidekicks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default SidekickList;
