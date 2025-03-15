import { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  ListSubheader,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import StoreIcon from '@mui/icons-material/Store';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SideNavigation = () => {
  const navigate = useNavigate();
  const [openAccounts, setOpenAccounts] = useState(true);
  const [openRetailers, setOpenRetailers] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);

  const handleClick = (section: string) => {
    switch (section) {
      case 'accounts':
        setOpenAccounts(!openAccounts);
        break;
      case 'retailers':
        setOpenRetailers(!openRetailers);
        break;
      case 'statistics':
        setOpenStatistics(!openStatistics);
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      
      <List
        component="nav"
        subheader={
          <ListSubheader component="div">
            금융 관리
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="대시보드" />
        </ListItemButton>

        {/* 계좌 관리 섹션 */}
        <ListItemButton onClick={() => handleClick('accounts')}>
          <ListItemIcon>
            <PointOfSaleIcon />
          </ListItemIcon>
          <ListItemText primary="계좌 관리" />
          {openAccounts ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAccounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/banks')}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="은행 목록" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/banks')}>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="계좌 목록" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/transactions')}>
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="거래 내역" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/transactions/create')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="거래 생성" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 판매자 관리 섹션 */}
        <ListItemButton onClick={() => handleClick('retailers')}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="판매자 관리" />
          {openRetailers ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openRetailers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/retailers')}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary="판매자 목록" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/retailers/create')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="판매자 추가" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 통계 섹션 */}
        <ListItemButton onClick={() => handleClick('statistics')}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="통계" />
          {openStatistics ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openStatistics} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/statistics/income-expense')}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="수입/지출 통계" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/statistics/categories')}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="카테고리별 통계" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}; 