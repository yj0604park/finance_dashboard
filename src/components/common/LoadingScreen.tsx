import { Box, CircularProgress } from '@mui/material';

export const LoadingScreen = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  );
}; 