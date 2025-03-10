import { AccountType, CurrencyType } from "../../../generated/graphql";
import { formatCurrency } from "../../../utils/currency"
import { Grid, Card, CardContent, Typography, Stack } from "@mui/material"

interface OverviewProps {
  accounts: Array<{
    type: AccountType;
    id: any;
    currency: CurrencyType;
    amount: number;
    name: string;
    isActive: boolean;
    bankName: string;
    bankId: string;
  }>;
}

interface CurrencyBalance {
  [key: string]: number;
}

export const Overview = ({ accounts }: OverviewProps) => {

  const balanceByCurrency = accounts.reduce((acc: CurrencyBalance, account) => {
    if (account?.amount && account?.currency) {
      acc[account.currency] = (acc[account.currency] || 0) + Number(account.amount);
    }
    return acc;
  }, {});

  return (
    <Grid container spacing={4} sx={{ width: '100%', mb: 4 }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              계좌 수
            </Typography>
            <Typography variant="h3">
              {accounts.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              총 잔액
            </Typography>
            <Stack spacing={1}>
              {Object.entries(balanceByCurrency).map(([currency, amount]) => (
                <Typography
                  key={currency}
                  variant="h4"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '1.5rem'
                  }}
                >
                  {formatCurrency(amount, currency)}
                </Typography>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              활성 계좌
            </Typography>
            <Typography variant="h3">
              {accounts.filter(account => account?.isActive).length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}