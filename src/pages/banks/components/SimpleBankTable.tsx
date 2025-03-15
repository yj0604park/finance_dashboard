import {
    Paper,
    TableContainer,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { GetBankSimpleListQuery } from '../../../generated/graphql';
import { formatCurrency } from '../../../utils/currency';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef
} from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type BankNode = GetBankSimpleListQuery['bankRelay']['edges'][0]['node'];

interface BankTableProps {
    banks: BankNode[];
}

export const SimpleBankTable = ({ banks }: BankTableProps) => {
    const [sorting, setSorting] = useState([{ id: 'name', desc: false }]);
    const navigate = useNavigate();
    
    const columns: ColumnDef<BankNode, any>[] = [
        {
            id: 'name',
            accessorKey: 'name',
            header: '은행명',
            cell: ({ getValue, row }) => (
                <Typography 
                    variant="body2" 
                    sx={{ 
                        cursor: 'pointer',
                        '&:hover': { 
                            textDecoration: 'underline',
                            color: 'primary.main'
                        }
                    }}
                    onClick={() => navigate(`/banks/${row.original.id}`)}
                >
                    {getValue() as string}
                </Typography>
            )
        },
        {
            id: 'accountCount',
            header: '계좌 수',
            cell: ({ row }) => (
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {row.original.accountSet.totalCount || 0}
                </Typography>
            )
        },
        {
            id: 'balance',
            header: '잔액',
            cell: ({ row }) => (
                <Box sx={{ textAlign: 'right' }}>
                    {row.original.balance.map((bal) => (
                        <Typography key={bal.currency} variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {formatCurrency(bal.value, bal.currency)}
                        </Typography>
                    ))}
                </Box>
            )
        }
    ];

    const table = useReactTable({
        data: banks,
        columns,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <TableContainer component={Paper} elevation={2} sx={{ mb: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {table.getHeaderGroups()[0].headers.map(header => (
                            <TableCell
                                key={header.id}
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    cursor: header.column.getCanSort() ? 'pointer' : 'default'
                                }}
                                onClick={header.column.getToggleSortingHandler()}
                                align={
                                    header.id === 'balance' ? 'right' : 
                                    header.id === 'accountCount' ? 'center' : 'left'
                                }
                            >
                                {header.isPlaceholder ? null : (
                                    <div>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' 🔼',
                                            desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow 
                            key={row.id}
                            hover
                            sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
                        >
                            {row.getVisibleCells().map(cell => (
                                <TableCell 
                                    key={cell.id}
                                    align={
                                        cell.column.id === 'balance' ? 'right' : 
                                        cell.column.id === 'accountCount' ? 'center' : 'left'
                                    }
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}; 