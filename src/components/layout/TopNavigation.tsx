import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const TopNavigation = () => {
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
            onClick={() => navigate('/taxes')}
            color={isActive('/taxes') ? 'primary' : 'inherit'}
          >
            세금
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 