import { Box, Typography, Card, CardContent, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Chip, Stack, Divider, LinearProgress, Alert, AlertTitle, List } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import EventIcon from '@mui/icons-material/Event';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { formatCurrency } from '../../utils/currency';

// 샘플 세금 데이터
const taxData = {
  taxYear: 2023,
  estimatedTaxes: {
    income: 9500000,
    property: 1200000,
    localTax: 950000,
    healthInsurance: 1800000,
    nationalPension: 1600000,
    total: 15050000
  },
  paidTaxes: 6000000,
  remainingTaxes: 9050000,
  deductions: [
    { id: 1, category: '의료비', amount: 2500000, status: 'verified' },
    { id: 2, category: '교육비', amount: 1800000, status: 'verified' },
    { id: 3, category: '기부금', amount: 500000, status: 'pending' },
    { id: 4, category: '연금보험료', amount: 4800000, status: 'verified' },
    { id: 5, category: '신용카드', amount: 12000000, status: 'pending' },
  ],
  importantDates: [
    { id: 1, name: '연말정산 자료 제출 기한', date: '2023-02-15', status: 'completed' },
    { id: 2, name: '1분기 사업소득세 납부', date: '2023-05-31', status: 'upcoming' },
    { id: 3, name: '종합소득세 신고', date: '2023-05-31', status: 'upcoming' },
    { id: 4, name: '재산세 납부 기한', date: '2023-07-31', status: 'upcoming' },
    { id: 5, name: '자동차세 납부 기한', date: '2023-12-31', status: 'upcoming' },
  ]
};

// 총 공제액 계산
const totalDeductions = taxData.deductions.reduce((sum, item) => sum + item.amount, 0);

// 세금 혜택 계산 (간단한 예시)
const expectedTaxBenefit = totalDeductions * 0.15;

export const Tax = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>세금 관리</Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>종합소득세 신고 기간 알림</AlertTitle>
        2023년 5월 1일부터 5월 31일까지 종합소득세 신고 및 납부 기간입니다. 
        시간이 <strong>52일</strong> 남았습니다.
      </Alert>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>세금 요약</Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography color="text.secondary" gutterBottom>2023년 예상 세금</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500, color: 'error.main' }}>
                      {formatCurrency(taxData.estimatedTaxes.total, 'KRW')}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography color="text.secondary" gutterBottom>납부 완료 세금</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      {formatCurrency(taxData.paidTaxes, 'KRW')}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography color="text.secondary" gutterBottom>예상 세금 혜택</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500, color: 'success.main' }}>
                      {formatCurrency(expectedTaxBenefit, 'KRW')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" sx={{ mb: 1 }}>세금 납부 현황</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={(taxData.paidTaxes / taxData.estimatedTaxes.total) * 100} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Typography>
                  {Math.round((taxData.paidTaxes / taxData.estimatedTaxes.total) * 100)}%
                </Typography>
              </Box>
              
              <Typography variant="subtitle1" sx={{ mb: 1 }}>세금 항목 내역</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>세금 항목</TableCell>
                      <TableCell align="right">예상 금액</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>소득세</TableCell>
                      <TableCell align="right">{formatCurrency(taxData.estimatedTaxes.income, 'KRW')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>재산세</TableCell>
                      <TableCell align="right">{formatCurrency(taxData.estimatedTaxes.property, 'KRW')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>지방세</TableCell>
                      <TableCell align="right">{formatCurrency(taxData.estimatedTaxes.localTax, 'KRW')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>건강보험료</TableCell>
                      <TableCell align="right">{formatCurrency(taxData.estimatedTaxes.healthInsurance, 'KRW')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>국민연금</TableCell>
                      <TableCell align="right">{formatCurrency(taxData.estimatedTaxes.nationalPension, 'KRW')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>총 세금</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(taxData.estimatedTaxes.total, 'KRW')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>공제 내역</Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>공제 항목</TableCell>
                      <TableCell align="right">금액</TableCell>
                      <TableCell align="right">상태</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {taxData.deductions.map((deduction) => (
                      <TableRow key={deduction.id}>
                        <TableCell>{deduction.category}</TableCell>
                        <TableCell align="right">{formatCurrency(deduction.amount, 'KRW')}</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={deduction.status === 'verified' ? '확인됨' : '확인 중'} 
                            color={deduction.status === 'verified' ? 'success' : 'warning'}
                            size="small" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>총 공제액</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(totalDeductions, 'KRW')}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button variant="outlined" sx={{ mr: 2 }}>세금 최적화 분석</Button>
                <Button variant="contained">공제 항목 추가</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon sx={{ mr: 1 }} />
                  <span>중요 세금 일정</span>
                </Box>
              </Typography>
              
              <List>
                {taxData.importantDates.map((item) => (
                  <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #f0f0f0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                      <Chip 
                        label={item.status === 'completed' ? '완료' : '예정'} 
                        color={item.status === 'completed' ? 'success' : 'primary'}
                        size="small" 
                      />
                    </Box>
                    <Typography color="text.secondary" variant="body2">{item.date}</Typography>
                  </Box>
                ))}
              </List>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="outlined" fullWidth>모든 세금 일정 보기</Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ReceiptIcon sx={{ mr: 1 }} />
                  <span>세금 절약 팁</span>
                </Box>
              </Typography>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>연금저축 공제 한도</AlertTitle>
                연금저축 납입액은 600만원까지 세액공제가 가능합니다.
              </Alert>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>의료비 공제</AlertTitle>
                총 급여의 3%를 초과하는 의료비에 대해 15% 세액공제가 가능합니다.
              </Alert>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>신용카드 사용액</AlertTitle>
                신용카드 사용액이 총 급여의 25%를 초과할 경우 최대 300만원까지 공제 혜택을 받을 수 있습니다.
              </Alert>
              
              <Alert severity="warning">
                <AlertTitle>중요 참고사항</AlertTitle>
                세금 절약 팁은 일반적인 내용이며, 개인의 상황에 따라 다를 수 있습니다. 정확한 세금 계획을 위해 세무사와 상담하세요.
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 