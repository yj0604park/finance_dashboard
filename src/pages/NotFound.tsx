import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)', // 헤더 높이만큼 빼기
      }}
    >
      <Stack spacing={3} alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
        <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 600 }}>
          페이지를 찾을 수 없습니다
        </Typography>
        <Typography color="text.secondary" align="center">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          대시보드로 이동
        </Button>
      </Stack>
    </Box>
  );
}; 