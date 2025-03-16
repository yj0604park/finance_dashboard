import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <TopNavigation />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - 240px)` }
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}; 