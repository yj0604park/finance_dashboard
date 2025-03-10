import { Box, Typography, Card, CardContent, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Chip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState } from 'react';

// 샘플 데이터 검증 결과
const sampleValidationData = [
  { id: 1, source: '계좌 정보', field: '계좌번호', status: 'error', message: '유효하지 않은 계좌번호 형식' },
  { id: 2, source: '거래 내역', field: '금액', status: 'warning', message: '비정상적으로 큰 금액 (검토 필요)' },
  { id: 3, source: '소득 신고', field: '월급', status: 'success', message: '검증 완료' },
  { id: 4, source: '투자 내역', field: '매수 일자', status: 'error', message: '미래 날짜로 설정됨' },
  { id: 5, source: '자산 평가', field: '부동산 가치', status: 'success', message: '검증 완료' },
  { id: 6, source: '대출 정보', field: '이자율', status: 'warning', message: '시장 평균보다 높은 이자율' },
  { id: 7, source: '세금 신고', field: '소득세', status: 'success', message: '검증 완료' },
];

export const Validation = () => {
  const [validationData, setValidationData] = useState(sampleValidationData);
  
  const handleRunValidation = () => {
    // 실제로는 API 호출 등 데이터 검증 로직이 들어갈 곳
    setValidationData([...sampleValidationData]);
  };
  
  // 상태별 개수 계산
  const errorCount = validationData.filter(item => item.status === 'error').length;
  const warningCount = validationData.filter(item => item.status === 'warning').length;
  const successCount = validationData.filter(item => item.status === 'success').length;
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>데이터 검증</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="error" variant="h5">{errorCount}</Typography>
              <Typography color="text.secondary">오류</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="warning.main" variant="h5">{warningCount}</Typography>
              <Typography color="text.secondary">경고</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="success.main" variant="h5">{successCount}</Typography>
              <Typography color="text.secondary">성공</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={handleRunValidation}
          sx={{ mr: 2 }}
        >
          검증 실행
        </Button>
        <Button variant="outlined">보고서 생성</Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>데이터 소스</TableCell>
              <TableCell>필드</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>메시지</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validationData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.source}</TableCell>
                <TableCell>{item.field}</TableCell>
                <TableCell>
                  {item.status === 'error' && (
                    <Chip 
                      icon={<ErrorOutlineIcon />} 
                      label="오류" 
                      color="error" 
                      size="small" 
                    />
                  )}
                  {item.status === 'warning' && (
                    <Chip 
                      icon={<ErrorOutlineIcon />} 
                      label="경고" 
                      color="warning" 
                      size="small" 
                    />
                  )}
                  {item.status === 'success' && (
                    <Chip 
                      icon={<CheckCircleOutlineIcon />} 
                      label="성공" 
                      color="success" 
                      size="small" 
                    />
                  )}
                </TableCell>
                <TableCell>{item.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 