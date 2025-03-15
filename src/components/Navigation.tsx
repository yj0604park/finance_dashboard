import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Financial Management
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => navigate('/')}
            color={isActive('/') ? 'primary' : 'inherit'}
          >
            대시보드
          </Button>
          <Button
            onClick={() => navigate('/banks')}
            color={isActive('/banks') ? 'primary' : 'inherit'}
          >
            은행
          </Button>
          <Button
            onClick={() => navigate('/transactions')}
            color={isActive('/transactions') ? 'primary' : 'inherit'}
          >
            거래내역
          </Button>
          <Button
            onClick={() => navigate('/transactions/create')}
            color={isActive('/transactions/create') ? 'primary' : 'inherit'}
          >
            거래 생성
          </Button>
          <Button
            onClick={() => navigate('/validation')}
            color={isActive('/validation') ? 'primary' : 'inherit'}
          >
            데이터 검증
          </Button>
          <Button
            onClick={() => navigate('/income')}
            color={isActive('/income') ? 'primary' : 'inherit'}
          >
            소득
          </Button>
          <Button
            onClick={() => navigate('/assets')}
            color={isActive('/assets') ? 'primary' : 'inherit'}
          >
            자산
          </Button>
          <Button
            onClick={() => navigate('/investments')}
            color={isActive('/investments') ? 'primary' : 'inherit'}
          >
            투자
          </Button>
          <Button
            onClick={() => navigate('/loans')}
            color={isActive('/loans') ? 'primary' : 'inherit'}
          >
            대출
          </Button>
          <Button
            onClick={() => navigate('/reports')}
            color={isActive('/reports') ? 'primary' : 'inherit'}
          >
            보고서
          </Button>        
          <Button
            onClick={() => navigate('/taxes')}
            color={isActive('/taxes') ? 'primary' : 'inherit'}
          >
            세금
          </Button>
          <Button
            onClick={() => navigate('/charts')}
            color={isActive('/charts') ? 'primary' : 'inherit'}
          >
            차트
          </Button>
          <Button
            onClick={() => navigate('/shopping')}
            color={isActive('/shopping') ? 'primary' : 'inherit'}
          >
            쇼핑
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 