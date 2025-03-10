import { useParams } from 'react-router-dom';
import { Box, Typography, Stack, Button } from '@mui/material';
import { useGetAccountNodeQuery } from '../../generated/graphql';
import { AccountTable } from '../../components/table/AccountTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BankDetail = () => {
  const { bankId } = useParams();
  const { data, loading, error } = useGetAccountNodeQuery({
    variables: {
      BankId: bankId as string,
      After: ""
    }
  });

  if (loading || !data) {
    return <Typography>로딩 중...</Typography>;
  }

  if (error) {
    return <Typography color="error">에러가 발생했습니다: {error.message}</Typography>;
  }
  const bank = data.bankRelay.edges[0].node;
  const accounts = data.accountRelay.edges.map(edge => ({...edge.node, bankName: bank.name, bankId: bank.id}));

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          href="/dashboard"
          sx={{ color: 'text.secondary' }}
        >
          돌아가기
        </Button>
        <Typography variant="h2" sx={{ fontSize: '1.4rem', fontWeight: 600 }}>
          {bank.name} 계좌 목록
        </Typography>
      </Box>

      <AccountTable accounts={accounts} />
    </Stack>
  );
}; 