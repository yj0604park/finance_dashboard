import { Box, Typography, Card, CardContent, Grid, Divider, Button, List, ListItem, ListItemText, LinearProgress, Chip } from '@mui/material';
import { formatCurrency } from '../../utils/currency';
import PieChart from '@mui/icons-material/PieChart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DiamondIcon from '@mui/icons-material/Diamond';

// 샘플 자산 데이터
const assetData = {
  totalAssets: 385000000,
  totalLiabilities: 120000000,
  netWorth: 265000000,
  assetsByCategory: [
    { category: '현금 및 예금', amount: 45000000, percentage: 11.7, icon: <AccountBalanceIcon /> },
    { category: '부동산', amount: 280000000, percentage: 72.7, icon: <HomeIcon /> },
    { category: '주식 및 투자', amount: 50000000, percentage: 13.0, icon: <PieChart /> },
    { category: '차량', amount: 8000000, percentage: 2.1, icon: <DirectionsCarIcon /> },
    { category: '귀금속 및 예술품', amount: 2000000, percentage: 0.5, icon: <DiamondIcon /> },
  ],
  liabilitiesByCategory: [
    { category: '주택담보대출', amount: 100000000, percentage: 83.3 },
    { category: '신용대출', amount: 15000000, percentage: 12.5 },
    { category: '신용카드 대금', amount: 5000000, percentage: 4.2 },
  ]
};

export const Assets = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>자산 관리</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>총 자산</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(assetData.totalAssets, 'KRW')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>총 부채</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500, color: 'error.main' }}>
                {formatCurrency(assetData.totalLiabilities, 'KRW')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>순자산</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(assetData.netWorth, 'KRW')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>자산 구성</Typography>
          <List>
            {assetData.assetsByCategory.map((item) => (
              <ListItem key={item.category} sx={{ px: 0 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={1}>
                    {item.icon}
                  </Grid>
                  <Grid item xs={11}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">{item.category}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {formatCurrency(item.amount, 'KRW')}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={item.percentage} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'right' }}>
                        {item.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>부채 내역</Typography>
          <List>
            {assetData.liabilitiesByCategory.map((item) => (
              <ListItem key={item.category} sx={{ px: 0 }}>
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">{item.category}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'error.main' }}>
                      {formatCurrency(item.amount, 'KRW')}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={item.percentage} 
                    color="error"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'right' }}>
                    {item.percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="outlined" sx={{ mr: 2 }}>분석 보고서</Button>
            <Button variant="contained">자산 추가</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}; 