import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useGetBankNodeWithBalanceQuery } from '../../generated/graphql';
import { CreateTransaction as TransactionForm } from '../../components/transaction/CreateTransaction';


export const CreateTransactionPage = () => {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [accounts, setAccounts] = useState<Array<{ id: string; name: string }>>([]);
  const { data: bankData, loading: bankLoading } = useGetBankNodeWithBalanceQuery();

  // 은행 데이터가 로드될 때 계좌 목록 초기화
  useEffect(() => {
    if (!bankData || !selectedBank) return;

    // 선택된 은행 찾기
    const bankEdge = bankData.bankRelay.edges.find(
      edge => String(edge.node.id) === selectedBank
    );

    if (!bankEdge) return;

    // 계좌 정보 가져오기
    const bankAccounts: Array<{ id: string; name: string }> = [];

    // 계좌 정보가 있는지 확인
    if (bankEdge.node.accountSet &&
      bankEdge.node.accountSet.edges) {
      // 각 계좌 정보를 배열에 추가
      bankEdge.node.accountSet.edges.forEach(accountEdge => {
        if (accountEdge && accountEdge.node) {
          bankAccounts.push({
            id: String(accountEdge.node.id),
            name: accountEdge.node.name
          });
        }
      });
    }

    setAccounts(bankAccounts);

    // 이전에 선택된 계좌가 현재 계좌 목록에 없는 경우 선택 초기화
    if (selectedAccount && !bankAccounts.some(acc => acc.id === selectedAccount)) {
      setSelectedAccount('');
    }
  }, [bankData, selectedBank]);

  // 은행 변경 처리
  const handleBankChange = (event: SelectChangeEvent) => {
    setSelectedBank(event.target.value);
  };

  // 계좌 변경 처리
  const handleAccountChange = (event: SelectChangeEvent) => {
    setSelectedAccount(event.target.value);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100%', px: 0 }}>
      <Box sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth disabled={bankLoading}>
                <InputLabel id="bank-select-label">은행</InputLabel>
                <Select
                  labelId="bank-select-label"
                  id="bank-select"
                  value={selectedBank}
                  onChange={handleBankChange}
                  label="은행"
                >
                  {bankData?.bankRelay.edges.map(edge => (
                    <MenuItem key={String(edge.node.id)} value={String(edge.node.id)}>
                      {edge.node.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth disabled={!selectedBank || accounts.length === 0}>
                <InputLabel id="account-select-label">계좌</InputLabel>
                <Select
                  labelId="account-select-label"
                  id="account-select"
                  value={selectedAccount}
                  onChange={handleAccountChange}
                  label="계좌"
                >
                  {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {selectedAccount ? (
          <TransactionForm accountId={selectedAccount} />
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              거래 생성을 시작하려면 계좌를 선택해주세요.
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}; 