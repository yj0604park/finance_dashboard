import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  retailer: string;
  note: string;
  isInternal: boolean;
}

const mockTransactions: Transaction[] = [
  { id: 1, date: '2023-10-01', amount: 10000, retailer: 'ABC Mart', note: 'Groceries', isInternal: false },
  { id: 2, date: '2023-10-02', amount: 5000, retailer: 'XYZ Cafe', note: 'Coffee', isInternal: false },
  // ... 더 많은 거래 데이터
];

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.retailer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        거래 내역
      </Typography>
      <TextField
        variant="outlined"
        placeholder="검색"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2, width: '100%' }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>날짜</TableCell>
              <TableCell>금액</TableCell>
              <TableCell>판매자</TableCell>
              <TableCell>메모</TableCell>
              <TableCell>내부 이체</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount.toLocaleString()} 원</TableCell>
                <TableCell>
                  <Link to={`/retailer/${transaction.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {transaction.retailer}
                  </Link>
                </TableCell>
                <TableCell>{transaction.note}</TableCell>
                <TableCell>{transaction.isInternal ? '예' : '아니오'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default TransactionList; 