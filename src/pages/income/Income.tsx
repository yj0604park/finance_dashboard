import { Box, Typography, Card, CardContent, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Chip, Stack, LinearProgress } from '@mui/material';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { formatCurrency } from '../../utils/currency';

// 샘플 소득 데이터
const sampleIncomeData = [
  { id: 1, source: '급여', amount: 3500000, date: '2023-03-01', category: '근로소득', recurring: true },
  { id: 2, source: '부업', amount: 1200000, date: '2023-03-15', category: '사업소득', recurring: false },
  { id: 3, source: '이자수입', amount: 150000, date: '2023-03-20', category: '금융소득', recurring: true },
  { id: 4, source: '배당금', amount: 300000, date: '2023-03-25', category: '금융소득', recurring: false },
  { id: 5, source: '임대수입', amount: 1000000, date: '2023-03-05', category: '부동산소득', recurring: true },
];

// 소득 카테고리별 통계
const incomeByCategory = [
  { category: '근로소득', amount: 3500000, percentage: 57 },
  { category: '사업소득', amount: 1200000, percentage: 19.5 },
  { category: '금융소득', amount: 450000, percentage: 7.5 },
  { category: '부동산소득', amount: 1000000, percentage: 16 },
];

export const Income = () => {
  const [incomeData] = useState(sampleIncomeData);
  
  // 총 소득 계산
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  
  // 이전 달 대비 증감률 (샘플 데이터)
  const previousMonthIncome = 5800000;
  const changePercentage = ((totalIncome - previousMonthIncome) / previousMonthIncome) * 100;
  const isIncreased = changePercentage > 0;
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>소득 관리</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>이번 달 총 소득</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(totalIncome, 'KRW')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip 
                  icon={isIncreased ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  label={`${Math.abs(changePercentage).toFixed(1)}%`}
                  color={isIncreased ? 'success' : 'error'}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {isIncreased ? '증가' : '감소'} (전월 대비)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>연간 예상 소득</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(totalIncome * 12, 'KRW')}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                * 정기적인 소득만 계산
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>소득 카테고리 분석</Typography>
          <Grid container spacing={2}>
            {incomeByCategory.map((item) => (
              <Grid item xs={12} key={item.category}>
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
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>소득 내역</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>소득원</TableCell>
                  <TableCell>카테고리</TableCell>
                  <TableCell>금액</TableCell>
                  <TableCell>날짜</TableCell>
                  <TableCell>유형</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.source}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{formatCurrency(item.amount, 'KRW')}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={item.recurring ? '정기적' : '일회성'} 
                        color={item.recurring ? 'primary' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}; 