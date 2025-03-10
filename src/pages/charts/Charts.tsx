import { Box, Typography, Card, CardContent, Grid, Tab, Tabs, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { formatCurrency } from '../../utils/currency';

// 실제 프로젝트에서는 recharts, chart.js, nivo 등 차트 라이브러리 사용 필요
// 여기서는 샘플 데이터만 정의하고 차트는 설명으로 대체

export const Charts = () => {
  const [tabValue, setTabValue] = useState(0);
  const [period, setPeriod] = useState('1y');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handlePeriodChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value);
  };
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>재무 차트</Typography>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="수입 vs 지출" />
          <Tab label="자산 배분" />
          <Tab label="순자산 추이" />
          <Tab label="투자 성과" />
          <Tab label="예산 분석" />
        </Tabs>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>기간</InputLabel>
          <Select
            value={period}
            label="기간"
            onChange={handlePeriodChange}
          >
            <MenuItem value="1m">1개월</MenuItem>
            <MenuItem value="3m">3개월</MenuItem>
            <MenuItem value="6m">6개월</MenuItem>
            <MenuItem value="1y">1년</MenuItem>
            <MenuItem value="all">전체</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>수입 vs 지출</Typography>
                
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 월별 수입과 지출을 비교하는 막대 그래프가 표시됩니다.]
                    <br />
                    수입 막대는 초록색, 지출 막대는 빨간색으로 표시되며 월별 순수익은 선 그래프로 표시됩니다.
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary">총 수입</Typography>
                    <Typography variant="h6" sx={{ color: 'success.main' }}>{formatCurrency(68500000, 'KRW')}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">총 지출</Typography>
                    <Typography variant="h6" sx={{ color: 'error.main' }}>{formatCurrency(45800000, 'KRW')}</Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">순수익</Typography>
                    <Typography variant="h6">{formatCurrency(22700000, 'KRW')}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>수입원 비율</Typography>
                
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 수입원 비율을 나타내는 파이 차트가 표시됩니다.]
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">근로소득</Typography>
                    <Typography variant="body2">65%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">투자 수익</Typography>
                    <Typography variant="body2">15%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">부업 수입</Typography>
                    <Typography variant="body2">12%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">기타 수입</Typography>
                    <Typography variant="body2">8%</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>지출 카테고리</Typography>
                
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 지출 카테고리별 비율을 나타내는 도넛 차트가 표시됩니다.]
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">주거비</Typography>
                    <Typography variant="body2">35%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">식비</Typography>
                    <Typography variant="body2">20%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">교통비</Typography>
                    <Typography variant="body2">15%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">기타 지출</Typography>
                    <Typography variant="body2">30%</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>자산 배분</Typography>
                
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 자산 유형별 배분을 나타내는 파이 차트가 표시됩니다.]
                    <br />
                    부동산, 현금 및 예금, 주식, 채권, 기타 자산으로 구분됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>자산별 수익률</Typography>
                
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 자산 유형별 수익률을 나타내는 수평 막대 차트가 표시됩니다.]
                    <br />
                    각 자산 유형의 연간 수익률이 표시됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 2 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>순자산 추이</Typography>
            
            <Box sx={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
              <Typography color="text.secondary">
                [여기에 시간에 따른 순자산 변화를 나타내는 영역 차트가 표시됩니다.]
                <br />
                자산과 부채가 누적 영역으로 표시되며, 순자산은 선 그래프로 나타납니다.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
      
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>투자 성과</Typography>
                
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 투자 유형별 성과를 나타내는 복합 차트가 표시됩니다.]
                    <br />
                    주식, 채권, 부동산, 기타 투자의 수익률이 시간에 따라 표시됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>투자 배분</Typography>
                
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 투자 배분을 나타내는 트리맵이 표시됩니다.]
                    <br />
                    각 투자 유형과 그 안의 세부 항목이 크기별로 표시됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>섹터별 배분</Typography>
                
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 투자 섹터별 배분을 나타내는 레이더 차트가 표시됩니다.]
                    <br />
                    IT, 금융, 헬스케어, 에너지 등 섹터별 배분이 표시됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      {tabValue === 4 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>예산 대비 실제 지출</Typography>
                
                <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 카테고리별 예산 대비 실제 지출을 나타내는 그룹화된 막대 차트가 표시됩니다.]
                    <br />
                    각 카테고리마다 예산(파란색)과 실제 지출(빨간색 또는 녹색)이 표시됩니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>월별 예산 사용률</Typography>
                
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 월별 예산 사용률을 나타내는 히트맵이 표시됩니다.]
                    <br />
                    월과 지출 카테고리로 이루어진 히트맵에서 색상 강도로 예산 사용률을 표시합니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>절감 가능 영역</Typography>
                
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px dashed #ddd', borderRadius: 1 }}>
                  <Typography color="text.secondary">
                    [여기에 절감 가능한 영역을 나타내는 펀널 차트가 표시됩니다.]
                    <br />
                    지출 카테고리별로 잠재적 절감액을 시각화하여 보여줍니다.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button variant="outlined" sx={{ mr: 2 }}>차트 내보내기</Button>
        <Button variant="contained">보고서 생성</Button>
      </Box>
    </Box>
  );
}; 