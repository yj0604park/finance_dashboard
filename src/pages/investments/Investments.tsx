import { Box, Typography, Card, CardContent, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Chip, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatCurrency } from '../../utils/currency';

// 샘플 투자 데이터
const stockInvestments = [
  { id: 1, name: '삼성전자', ticker: '005930', quantity: 50, price: 70000, currentPrice: 73800, sector: '전자' },
  { id: 2, name: 'NAVER', ticker: '035420', quantity: 10, price: 320000, currentPrice: 305000, sector: 'IT' },
  { id: 3, name: '카카오', ticker: '035720', quantity: 20, price: 75000, currentPrice: 82500, sector: 'IT' },
  { id: 4, name: '현대차', ticker: '005380', quantity: 15, price: 180000, currentPrice: 192000, sector: '자동차' },
  { id: 5, name: 'LG화학', ticker: '051910', quantity: 5, price: 650000, currentPrice: 695000, sector: '화학' },
];

const cryptoInvestments = [
  { id: 1, name: '비트코인', ticker: 'BTC', quantity: 0.5, price: 40000000, currentPrice: 43500000, sector: '가상화폐' },
  { id: 2, name: '이더리움', ticker: 'ETH', quantity: 2, price: 3000000, currentPrice: 2850000, sector: '가상화폐' },
  { id: 3, name: '솔라나', ticker: 'SOL', quantity: 20, price: 150000, currentPrice: 170000, sector: '가상화폐' },
];

const realEstateInvestments = [
  { id: 1, name: '강남 오피스텔', location: '서울 강남구', purchasePrice: 180000000, currentValue: 210000000, size: '21평', type: '오피스텔' },
  { id: 2, name: '부산 아파트', location: '부산 해운대구', purchasePrice: 350000000, currentValue: 380000000, size: '32평', type: '아파트' },
];

export const Investments = () => {
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // 주식 투자 총액 및 수익률 계산
  const totalStockInvestment = stockInvestments.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const currentStockValue = stockInvestments.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const stockProfit = currentStockValue - totalStockInvestment;
  const stockProfitPercentage = (stockProfit / totalStockInvestment) * 100;
  
  // 암호화폐 투자 총액 및 수익률 계산
  const totalCryptoInvestment = cryptoInvestments.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const currentCryptoValue = cryptoInvestments.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const cryptoProfit = currentCryptoValue - totalCryptoInvestment;
  const cryptoProfitPercentage = (cryptoProfit / totalCryptoInvestment) * 100;
  
  // 부동산 투자 총액 및 수익률 계산
  const totalRealEstateInvestment = realEstateInvestments.reduce((sum, item) => sum + item.purchasePrice, 0);
  const currentRealEstateValue = realEstateInvestments.reduce((sum, item) => sum + item.currentValue, 0);
  const realEstateProfit = currentRealEstateValue - totalRealEstateInvestment;
  const realEstateProfitPercentage = (realEstateProfit / totalRealEstateInvestment) * 100;
  
  // 전체 투자 총액 및 수익률 계산
  const totalInvestment = totalStockInvestment + totalCryptoInvestment + totalRealEstateInvestment;
  const currentTotalValue = currentStockValue + currentCryptoValue + currentRealEstateValue;
  const totalProfit = currentTotalValue - totalInvestment;
  const totalProfitPercentage = (totalProfit / totalInvestment) * 100;
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>투자 관리</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>총 투자금액</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(totalInvestment, 'KRW')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>현재 가치</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(currentTotalValue, 'KRW')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip 
                  icon={totalProfit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(totalProfitPercentage).toFixed(2)}%`}
                  color={totalProfit >= 0 ? 'success' : 'error'}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatCurrency(totalProfit, 'KRW')} {totalProfit >= 0 ? '수익' : '손실'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="주식" />
            <Tab label="암호화폐" />
            <Tab label="부동산" />
          </Tabs>
          
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>주식 투자</Typography>
                <Chip 
                  icon={stockProfit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(stockProfitPercentage).toFixed(2)}%`}
                  color={stockProfit >= 0 ? 'success' : 'error'}
                  size="small"
                />
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>종목명</TableCell>
                      <TableCell>종목코드</TableCell>
                      <TableCell>섹터</TableCell>
                      <TableCell align="right">보유수량</TableCell>
                      <TableCell align="right">평균단가</TableCell>
                      <TableCell align="right">현재가</TableCell>
                      <TableCell align="right">평가금액</TableCell>
                      <TableCell align="right">수익률</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockInvestments.map((item) => {
                      const investmentAmount = item.price * item.quantity;
                      const currentAmount = item.currentPrice * item.quantity;
                      const profit = currentAmount - investmentAmount;
                      const profitPercentage = (profit / investmentAmount) * 100;
                      
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.ticker}</TableCell>
                          <TableCell>{item.sector}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{formatCurrency(item.price, 'KRW')}</TableCell>
                          <TableCell align="right">{formatCurrency(item.currentPrice, 'KRW')}</TableCell>
                          <TableCell align="right">{formatCurrency(currentAmount, 'KRW')}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              icon={profit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                              label={`${Math.abs(profitPercentage).toFixed(2)}%`}
                              color={profit >= 0 ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>암호화폐 투자</Typography>
                <Chip 
                  icon={cryptoProfit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(cryptoProfitPercentage).toFixed(2)}%`}
                  color={cryptoProfit >= 0 ? 'success' : 'error'}
                  size="small"
                />
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>종목명</TableCell>
                      <TableCell>티커</TableCell>
                      <TableCell align="right">보유수량</TableCell>
                      <TableCell align="right">평균단가</TableCell>
                      <TableCell align="right">현재가</TableCell>
                      <TableCell align="right">평가금액</TableCell>
                      <TableCell align="right">수익률</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cryptoInvestments.map((item) => {
                      const investmentAmount = item.price * item.quantity;
                      const currentAmount = item.currentPrice * item.quantity;
                      const profit = currentAmount - investmentAmount;
                      const profitPercentage = (profit / investmentAmount) * 100;
                      
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.ticker}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{formatCurrency(item.price, 'KRW')}</TableCell>
                          <TableCell align="right">{formatCurrency(item.currentPrice, 'KRW')}</TableCell>
                          <TableCell align="right">{formatCurrency(currentAmount, 'KRW')}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              icon={profit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                              label={`${Math.abs(profitPercentage).toFixed(2)}%`}
                              color={profit >= 0 ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>부동산 투자</Typography>
                <Chip 
                  icon={realEstateProfit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(realEstateProfitPercentage).toFixed(2)}%`}
                  color={realEstateProfit >= 0 ? 'success' : 'error'}
                  size="small"
                />
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>자산명</TableCell>
                      <TableCell>위치</TableCell>
                      <TableCell>타입</TableCell>
                      <TableCell>면적</TableCell>
                      <TableCell align="right">매입가</TableCell>
                      <TableCell align="right">현재 가치</TableCell>
                      <TableCell align="right">수익률</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {realEstateInvestments.map((item) => {
                      const profit = item.currentValue - item.purchasePrice;
                      const profitPercentage = (profit / item.purchasePrice) * 100;
                      
                      return (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell align="right">{formatCurrency(item.purchasePrice, 'KRW')}</TableCell>
                          <TableCell align="right">{formatCurrency(item.currentValue, 'KRW')}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              icon={profit >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                              label={`${Math.abs(profitPercentage).toFixed(2)}%`}
                              color={profit >= 0 ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}; 