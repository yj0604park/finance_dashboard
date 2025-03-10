import { Typography, Box, CircularProgress } from '@mui/material';
import { useGetBankSimpleListQuery } from '../../generated/graphql';
import { SimpleBankTable } from './components/SimpleBankTable';

export const Banks = () => {
  const { data, loading, error } = useGetBankSimpleListQuery();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        에러가 발생했습니다: {error.message}
      </Typography>
    );
  }

  const bankLists = data?.bankRelay?.edges.map(edge => edge.node) ?? [];

  return (
    <>
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: '1.4rem',
          fontWeight: 600,
          mb: 2
        }}
      >
        은행 목록
      </Typography>
      <Box sx={{ mb: 4 }}>
        <SimpleBankTable banks={bankLists} />
      </Box>
    </>
  );
}; 