import { Box } from '@mui/material';

type CurrencySymbols = {
  KRW: string;
  USD: string;
  EUR: string;
  JPY: string;
  [key: string]: string;
};

const currencySymbol: CurrencySymbols = {
  KRW: '₩',
  USD: '$',
  EUR: '€',
  JPY: '¥',
};

export const formatCurrency = (amount: number | null | undefined, currency: string | null | undefined) => {
  if (amount === null || amount === undefined || currency === null || currency === undefined) {
    return '-';
  }

  const symbol = currencySymbol[currency] || currency;
  const formattedAmount = Math.abs(amount).toLocaleString();
  
  if(amount >= 0) {
    return `${symbol} ${formattedAmount}`;
  } else {
    return (
      <Box component="span" sx={{ 
        display: 'inline-flex', 
        alignItems: 'center',
        color: 'error.main'
      }}>
        <Box component="span" sx={{ 
          display: 'inline-block',
          width: '0.4em',
          height: '2px',
          backgroundColor: 'error.main',
          mr: 0.5
        }} />
        {`${symbol} ${formattedAmount}`}
      </Box>
    );
  }
};
