import { Typography, Card, CardContent, CardActionArea, Grid2 } from '@mui/material';
import { BankNode } from '../../../generated/graphql';
import { formatCurrency } from '../../../utils/currency';
import { useNavigate } from 'react-router-dom';

interface BankListProps {
  banks: BankNode[];
}

const BankCard = ({ bank }: { bank: BankNode }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea onClick={() => {
        navigate(`/banks/${bank.id}`);
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {bank.name}
          </Typography>
          {bank.balance.map((balance) => (
            <Typography key={balance.currency}>
              {formatCurrency(balance.value, balance.currency)}
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export const BankList = ({ banks }: BankListProps) => {
  return (
    <Grid2 container spacing={2}>
      {banks.map((bank) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={bank.id}>
          <BankCard bank={bank} />
        </Grid2>
      ))}
    </Grid2>
  );
}; 