import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, Button, Card, CardContent, Grid, Chip, Snackbar, Alert } from '@mui/material';
import { useGetTransactionListQuery, useCreateTransactionMutation } from '../../generated/graphql';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatCurrency } from '../../utils/currency';
import { Link } from '@mui/material';
import { TransactionTable } from './components/TransactionTable';
import { useState } from 'react';
import { translateAccountType } from '../../utils/accountTranslations';

export const AccountDetail = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [createTransaction] = useCreateTransactionMutation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, loading, error, refetch } = useGetTransactionListQuery({
    variables: {
      AccountID: accountId,
      First: pageSize,
      After: page > 0 ? btoa(`arrayconnection:${(page * pageSize) - 1}`) : undefined
    }
  });

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  if (error) {
    return <Typography color="error">에러가 발생했습니다: {error.message}</Typography>;
  }

  const account = data?.accountRelay.edges[0].node;

  if (!account) {
    return <Typography>계좌를 찾을 수 없습니다.</Typography>;
  }

  const transactions = data?.transactionRelay.edges.map(edge => edge.node);

  const handleCreateTransaction = async (data: { amount: number; date: string; isInternal?: boolean; note?: string }) => {
    try {
      await createTransaction({
        variables: {
          amount: data.amount,
          date: data.date,
          accountId: accountId,
          isInternal: data.isInternal,
          note: data.note
        }
      });
      
      setSuccessMessage("거래가 성공적으로 추가되었습니다.");
      
      refetch();
    } catch (error) {
      console.error('거래 내역 생성 실패:', error);
      setErrorMessage("거래 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ color: 'text.secondary' }}
        >
          돌아가기
        </Button>
        <Typography variant="h2" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          계좌 상세 정보
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {account.name}
                </Typography>
                <Chip 
                  label={account.isActive ? '활성' : '비활성'} 
                  color={account.isActive ? 'success' : 'error'} 
                  size="small"
                />
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary" gutterBottom>은행</Typography>
              <Link href={`/banks/${account.bank.id}`}><Typography>{account.bank.name}</Typography></Link>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary" gutterBottom>계좌 종류</Typography>
              <Typography>{translateAccountType(account.type)}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary" gutterBottom>통화</Typography>
              <Typography>{account.currency}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary" gutterBottom>잔액</Typography>
              <Typography sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                {formatCurrency(account.amount, account.currency)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>거래 내역</Typography>
          <TransactionTable 
            transactions={transactions} 
            currency={account.currency}
            pageSize={pageSize}
            page={page}
            totalCount={data?.transactionRelay.totalCount || 0}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onCreateTransaction={handleCreateTransaction}
          />
        </CardContent>
      </Card>
      
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!errorMessage} 
        autoHideDuration={6000} 
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}; 