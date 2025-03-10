import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, TableContainer, TablePagination, IconButton, Button } from '@mui/material';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { formatCurrency } from '../../../utils/currency';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { TransactionCreateModal } from './TransactionCreateModal';

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  balance: number;
  note?: string | null | undefined;
}

interface TransactionTableProps {
  transactions: Transaction[];
  currency: string;
  pageSize: number;
  page: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onCreateTransaction?: (data: { amount: number; date: string; isInternal?: boolean; note?: string }) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="처음 페이지"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="이전 페이지"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="다음 페이지"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="마지막 페이지"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

export const TransactionTable = ({ 
  transactions, 
  currency, 
  pageSize,
  page,
  totalCount,
  onPageChange,
  onPageSizeChange,
  onCreateTransaction
}: TransactionTableProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnDef<Transaction>[] = [
    {
      id: 'date',
      accessorKey: 'date',
      header: '날짜',
      cell: ({ getValue }) => (
        <Typography variant="body2">
          {format(new Date(getValue() as string), 'PPP', { locale: ko })}
        </Typography>
      ),
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: '종류',
      cell: ({ getValue }) => (
        <Typography variant="body2">
          {getValue() as string}
        </Typography>
      ),
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: '금액',
      cell: ({ getValue }) => (
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'monospace', 
            fontWeight: 500,
            color: (getValue() as number) >= 0 ? 'success.main' : 'error.main',
            textAlign: 'right'
          }}
        >
          {formatCurrency(getValue() as number, currency)}
        </Typography>
      ),
    },
    {
      id: 'balance',
      accessorKey: 'balance',
      header: '잔액',
      cell: ({ getValue }) => (
        <Typography variant="body2">
          {formatCurrency(getValue() as number, currency)}
        </Typography>
      ),
    },
    {
      id: 'description',
      accessorKey: 'note',
      header: '메모',
      cell: ({ getValue }) => (
        <Typography variant="body2">
          {(getValue() as string) || '-'}
        </Typography>
      ),
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {onCreateTransaction && (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            거래 내역 추가
          </Button>
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {table.getFlatHeaders().map(header => (
                <TableCell
                  key={header.id}
                  sx={{
                    backgroundColor: 'background.neutral',
                    fontWeight: 600,
                  }}
                  align={header.column.id === 'amount' || header.column.id === 'balance' ? 'right' : 'left'}
                >
                  {header.column.columnDef.header?.toString()}
                </TableCell>
              ))}
            </TableRow>
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
                    align={cell.column.id === 'amount' || cell.column.id === 'balance' ? 'right' : 'left'}
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
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(0);
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="페이지당 행 수:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} / ${count}`
          }
          ActionsComponent={TablePaginationActions}
        />
      </Box>
      {onCreateTransaction && (
        <TransactionCreateModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(data) => {
            onCreateTransaction(data);
            setIsCreateModalOpen(false);
          }}
          currency={currency}
        />
      )}
    </Paper>
  );
}; 