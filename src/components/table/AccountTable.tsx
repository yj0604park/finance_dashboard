import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, TableContainer, TablePagination, TextField, Select, MenuItem, SelectChangeEvent, Link } from '@mui/material';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  type ColumnDef,
} from '@tanstack/react-table';
import { formatCurrency } from '../../utils/currency';
import { useState } from 'react';
import React from 'react';
import { translateAccountType } from '../../utils/accountTranslations';

interface Account {
  id: string;
  name: string;
  bankName: string;
  bankId: string;
  type: string;
  currency: string;
  amount: number;
  isActive: boolean;
}

interface AccountTableProps {
  accounts: Account[];
}

export const AccountTable = ({ accounts }: AccountTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'bankName', desc: false }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'isActive', value: true }
  ]);

  // 고유한 은행명 추출
  const uniqueBanks = [...new Set(accounts.map(account => account.bankName))].sort();

  const columns: ColumnDef<Account, any>[] = [
    {
      id: 'bankName',
      accessorKey: 'bankName',
      header: '은행',
      cell: ({ getValue, row }) => (
        <Link
          href={`/banks/${row.original.bankId}`}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {getValue() as string}
          </Typography>
        </Link>
      ),
      enableColumnFilter: true,
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: '계좌명',
      cell: ({ getValue, row }) => (
        <Link
          href={`/accounts/${row.original.id}`}
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <Typography variant="body2">
            {getValue() as string}
          </Typography>
        </Link>
      ),
      enableColumnFilter: true,
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: '종류',
      cell: ({ getValue }) => (
        <Typography variant="body2">
          {translateAccountType(getValue() as string)}
        </Typography>
      ),
      enableColumnFilter: true,
    },
    {
      id: 'currency',
      accessorKey: 'currency',
      header: '통화',
      cell: ({ getValue }) => (
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {getValue() as string}
        </Typography>
      ),
      enableColumnFilter: true,
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: '잔액',
      cell: ({ row, getValue }) => (
        <Typography variant="body2" sx={{
          fontFamily: 'monospace',
          fontWeight: 500,
          textAlign: 'right'
        }}>
          {formatCurrency(getValue() as number, row.original.currency)}
        </Typography>
      ),
      enableColumnFilter: false,
    },
    {
      id: 'isActive',
      accessorKey: 'isActive',
      header: '상태',
      cell: ({ getValue }) => (
        <Typography variant="body2" sx={{
          color: getValue() ? 'success.main' : 'error.main',
          fontWeight: 500,
          textAlign: 'center'
        }}>
          {(getValue() as boolean) ? '활성' : '비활성'}
        </Typography>
      ),
      enableColumnFilter: true,
    },
  ];

  const table = useReactTable({
    data: accounts,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                <TableRow>
                  {headerGroup.headers.map(header => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: 'background.neutral',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                        ...(header.column.getCanSort() && {
                          userSelect: 'none',
                        }),
                      }}
                      align={header.column.id === 'amount' ? 'right' :
                        header.column.id === 'isActive' ? 'center' : 'left'}
                    >
                      {header.column.columnDef.header?.toString()}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {headerGroup.headers.map(header => (
                    <TableCell key={header.id} sx={{ padding: 1 }}>
                      {header.column.getCanFilter() && (
                        header.column.id === 'currency' ? (
                          <Select
                            size="small"
                            fullWidth
                            value={(header.column.getFilterValue() as string) ?? ''}
                            onChange={(e: SelectChangeEvent) => header.column.setFilterValue(e.target.value)}
                            displayEmpty
                            sx={{
                              backgroundColor: 'background.paper',
                            }}
                          >
                            <MenuItem value="">전체</MenuItem>
                            <MenuItem value="KRW">KRW</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                          </Select>
                        ) : header.column.id === 'isActive' ? (
                          <Select
                            size="small"
                            fullWidth
                            value={(header.column.getFilterValue()?.toString() ?? '')}
                            onChange={(e: SelectChangeEvent) =>
                              header.column.setFilterValue(e.target.value === '' ? '' : e.target.value === 'true')}
                            displayEmpty
                            sx={{
                              backgroundColor: 'background.paper',
                            }}
                          >
                            <MenuItem value="">전체</MenuItem>
                            <MenuItem value="true">활성</MenuItem>
                            <MenuItem value="false">비활성</MenuItem>
                          </Select>
                        ) : header.column.id === 'bankName' ? (
                          <Select
                            size="small"
                            fullWidth
                            value={(header.column.getFilterValue() as string) ?? ''}
                            onChange={(e: SelectChangeEvent) => header.column.setFilterValue(e.target.value)}
                            displayEmpty
                            sx={{
                              backgroundColor: 'background.paper',
                            }}
                          >
                            <MenuItem value="">전체</MenuItem>
                            {uniqueBanks.map(bank => (
                              <MenuItem key={bank} value={bank}>{bank}</MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <TextField
                            size="small"
                            fullWidth
                            placeholder={`${header.column.columnDef.header?.toString() ?? ''} 검색...`}
                            value={(header.column.getFilterValue() as string) ?? ''}
                            onChange={e => header.column.setFilterValue(e.target.value)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.paper',
                              }
                            }}
                          />
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    align={cell.column.id === 'amount' ? 'right' :
                      cell.column.id === 'isActive' ? 'center' : 'left'}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <TablePagination
          component="div"
          count={table.getFilteredRowModel().rows.length}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
          rowsPerPage={table.getState().pagination.pageSize}
          onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
          rowsPerPageOptions={[5, 10, 20]}
          labelRowsPerPage="페이지당 행 수:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} / ${count}`
          }
        />
      </Box>
    </Paper>
  );
}; 