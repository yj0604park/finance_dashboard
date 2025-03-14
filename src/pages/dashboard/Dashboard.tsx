import { Typography, Stack, Container } from '@mui/material';
import { BankList } from './components/BankList';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { ErrorScreen } from '../../components/common/ErrorScreen';
import { useBankData } from '../../hooks/useBankData';
import { AmountChart } from './components/AmountChart';
import { Overview } from './components/Overview';
import { AccountTable } from '../../components/table/AccountTable';
import { useGetBankNodeWithBalanceQuery } from '../../generated/graphql';
import { BankNode } from '../../types/bank';

export const Dashboard = () => {
  const { banks, loading: banksLoading, error: banksError } = useBankData();
  const { data: accountData, loading: accountsLoading, error: accountsError } = useGetBankNodeWithBalanceQuery();

  if (banksLoading || accountsLoading) return <LoadingScreen />;
  if (banksError) return <ErrorScreen message={banksError.message} />;
  if (accountsError) return <ErrorScreen message={accountsError.message} />;

  const accounts = accountData?.bankRelay.edges.flatMap(bank => 
    bank.node.accountSet.edges.map(account => ({
      ...account.node,
      bankName: bank.node.name,
      bankId: bank.node.id
    }))
  ) ?? [];

  return (
    <Container>
      <Stack spacing={3}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: '1.4rem',
            fontWeight: 600,
          }}
        >
          대시보드
        </Typography>

        <Overview accounts={accounts} />

        <AmountChart />

        <BankList banks={banks as BankNode[]} />

        <Stack spacing={2}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontSize: '1.2rem',
              fontWeight: 500,
            }}
          >
            계좌 목록
          </Typography>
          <AccountTable accounts={accounts} />
        </Stack>
      </Stack>
    </Container>
  );
}; 