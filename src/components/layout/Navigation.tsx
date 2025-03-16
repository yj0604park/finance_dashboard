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
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const SideNavigation = () => {
  const navigate = useNavigate();
  const [openAccounts, setOpenAccounts] = useState(true);
  const [openRetailers, setOpenRetailers] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);
  const [openManagement, setOpenManagement] = useState(false);
  const [openAssets, setOpenAssets] = useState(false);
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
      case 'management':
        setOpenManagement(!openManagement);
        break;
      case 'assets':
        setOpenAssets(!openAssets);
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

        {/* 자산 관리 섹션 */}
        <ListItemButton onClick={() => handleClick('assets')}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="자산 관리" />
          {openAssets ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAssets} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/assets')}>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="자산 목록" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/income')}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary="소득" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/investments')}>
              <ListItemIcon>
                <PriceChangeIcon />
              </ListItemIcon>
              <ListItemText primary="투자" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/loans')}>
              <ListItemIcon>
                <LocalAtmIcon />
              </ListItemIcon>
              <ListItemText primary="대출" />
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
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/shopping')}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="쇼핑" />
            </ListItemButton>

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
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/reports')}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="보고서" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/charts')}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="차트" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 관리 섹션 */}
        <ListItemButton onClick={() => handleClick('management')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="관리" />
          {openManagement ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openManagement} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/management/users')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="사용자 관리" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/validation')}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="데이터 검증" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}; 