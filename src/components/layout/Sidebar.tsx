import { Box, Drawer, styled } from '@mui/material';
import { SideNavigation } from './Navigation';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const Sidebar = () => {
  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <SideNavigation />
      </Box>
    </StyledDrawer>
  );
}; 