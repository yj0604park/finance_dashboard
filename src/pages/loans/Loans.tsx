import { Box, Typography, Card, CardContent, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Chip, LinearProgress } from '@mui/material';
import { formatCurrency } from '../../utils/currency';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';

// 샘플 대출 데이터
const loanData = [
  { 
    id: 1, 
    name: '주택담보대출', 
    lender: '국민은행', 
    principal: 180000000, 
    balance: 150000000,
    interest: 3.5,
    term: 30,
    startDate: '2020-05-15',
    endDate: '2050-05-15',
    monthlyPayment: 800000,
    type: '주택담보',
    status: 'active',
    icon: <HomeIcon />
  },
  { 
    id: 2, 
    name: '전세자금대출', 
    lender: '신한은행', 
    principal: 50000000, 
    balance: 45000000,
    interest: 2.8,
    term: 2,
    startDate: '2022-03-10',
    endDate: '2024-03-10',
    monthlyPayment: 300000,
    type: '전세자금',
    status: 'active',
    icon: <HomeIcon />
  },
  { 
    id: 3, 
    name: '개인신용대출', 
    lender: '하나은행', 
    principal: 20000000, 
    balance: 15000000,
    interest: 4.5,
    term: 3,
    startDate: '2021-08-20',
    endDate: '2024-08-20',
    monthlyPayment: 600000,
    type: '신용',
    status: 'active',
    icon: <AccountBalanceIcon />
  },
  { 
    id: 4, 
    name: '학자금대출', 
    lender: '한국장학재단', 
    principal: 12000000, 
    balance: 8000000,
    interest: 2.2,
    term: 10,
    startDate: '2018-03-01',
    endDate: '2028-03-01',
    monthlyPayment: 110000,
    type: '학자금',
    status: 'active',
    icon: <SchoolIcon />
  },
  { 
    id: 5, 
    name: '신용카드 할부', 
    lender: '삼성카드', 
    principal: 3000000, 
    balance: 2000000,
    interest: 6.5,
    term: 0.5,
    startDate: '2023-01-15',
    endDate: '2023-07-15',
    monthlyPayment: 510000,
    type: '신용카드',
    status: 'active',
    icon: <CreditCardIcon />
  },
];

export const Loans = () => {
  // 총 대출 잔액 계산
  const totalLoanBalance = loanData.reduce((sum, loan) => sum + loan.balance, 0);
  
  // 총 원금 계산
  const totalPrincipal = loanData.reduce((sum, loan) => sum + loan.principal, 0);
  
  // 상환 진행률 계산
  const repaymentProgress = ((totalPrincipal - totalLoanBalance) / totalPrincipal) * 100;
  
  // 월 상환액 계산
  const totalMonthlyPayment = loanData.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>대출 관리</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>총 대출 잔액</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500, color: 'error.main' }}>
                {formatCurrency(totalLoanBalance, 'KRW')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>상환 진행률</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={repaymentProgress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Typography variant="h6" component="div">{repaymentProgress.toFixed(1)}%</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {formatCurrency(totalPrincipal - totalLoanBalance, 'KRW')} / {formatCurrency(totalPrincipal, 'KRW')} 상환
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>월 상환액</Typography>
              <Typography variant="h4" sx={{ fontWeight: 500 }}>
                {formatCurrency(totalMonthlyPayment, 'KRW')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>대출 목록</Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>대출명</TableCell>
                  <TableCell>대출기관</TableCell>
                  <TableCell>유형</TableCell>
                  <TableCell align="right">금리</TableCell>
                  <TableCell align="right">원금</TableCell>
                  <TableCell align="right">잔액</TableCell>
                  <TableCell align="right">월 상환액</TableCell>
                  <TableCell align="right">상환 진행률</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanData.map((loan) => {
                  const progress = ((loan.principal - loan.balance) / loan.principal) * 100;
                  
                  return (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 1 }}>{loan.icon}</Box>
                          {loan.name}
                        </Box>
                      </TableCell>
                      <TableCell>{loan.lender}</TableCell>
                      <TableCell>
                        <Chip 
                          label={loan.type} 
                          size="small" 
                          color={
                            loan.type === '주택담보' || loan.type === '전세자금' ? 'primary' :
                            loan.type === '신용' ? 'warning' :
                            loan.type === '학자금' ? 'info' : 'default'
                          }
                        />
                      </TableCell>
                      <TableCell align="right">{loan.interest}%</TableCell>
                      <TableCell align="right">{formatCurrency(loan.principal, 'KRW')}</TableCell>
                      <TableCell align="right">{formatCurrency(loan.balance, 'KRW')}</TableCell>
                      <TableCell align="right">{formatCurrency(loan.monthlyPayment, 'KRW')}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '60%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={progress} 
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                          <Typography variant="body2">{progress.toFixed(1)}%</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="outlined" sx={{ mr: 2 }}>대출 시뮬레이션</Button>
            <Button variant="contained">대출 추가</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}; 