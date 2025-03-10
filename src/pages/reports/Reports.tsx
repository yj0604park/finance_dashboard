import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Button, Divider, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Chip, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { formatCurrency } from '../../utils/currency';

// 샘플 보고서 데이터
const recentReports = [
  { 
    id: 1, 
    title: '월간 재무 보고서', 
    date: '2023-03-01',
    type: 'monthly',
    format: 'pdf',
    size: '1.2MB',
    description: '3월 월간 재무 현황 및 자산 배분 분석'
  },
  { 
    id: 2, 
    title: '분기 포트폴리오 분석', 
    date: '2023-01-15',
    type: 'quarterly',
    format: 'xlsx',
    size: '3.4MB',
    description: '2023년 1분기 투자 포트폴리오 성과 분석'
  },
  { 
    id: 3, 
    title: '연간 세금 보고서', 
    date: '2022-12-31',
    type: 'annual',
    format: 'pdf',
    size: '5.8MB',
    description: '2022년 연간 세금 보고 및 절세 분석'
  },
  { 
    id: 4, 
    title: '부채 상환 계획', 
    date: '2023-02-15',
    type: 'custom',
    format: 'pdf',
    size: '0.9MB',
    description: '효율적인 부채 상환을 위한 계획 및 시뮬레이션'
  },
  { 
    id: 5, 
    title: '자산 배분 전략', 
    date: '2023-02-28',
    type: 'custom',
    format: 'pdf',
    size: '2.1MB',
    description: '자산 배분 최적화 및 리밸런싱 전략'
  },
];

// 샘플 예약된 보고서 데이터
const scheduledReports = [
  { 
    id: 1, 
    title: '월간 재무 현황', 
    frequency: '매월 1일',
    nextDate: '2023-04-01',
    recipients: ['나'],
    status: 'active'
  },
  { 
    id: 2, 
    title: '분기 투자 성과', 
    frequency: '분기말',
    nextDate: '2023-06-30',
    recipients: ['나', '재무상담사'],
    status: 'active'
  },
  { 
    id: 3, 
    title: '세금 신고 준비', 
    frequency: '매년 3월 1일',
    nextDate: '2024-03-01',
    recipients: ['나', '세무사'],
    status: 'active'
  },
];

export const Reports = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>보고서</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>최근 보고서</Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>제목</TableCell>
                      <TableCell>날짜</TableCell>
                      <TableCell>유형</TableCell>
                      <TableCell>포맷</TableCell>
                      <TableCell>크기</TableCell>
                      <TableCell align="right">액션</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 1 }}>
                              {report.format === 'pdf' ? 
                                <PictureAsPdfIcon color="error" fontSize="small" /> : 
                                <InsertDriveFileIcon color="primary" fontSize="small" />
                              }
                            </Box>
                            <Box>
                              <Typography variant="body2">{report.title}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {report.description}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Chip 
                            label={
                              report.type === 'monthly' ? '월간' : 
                              report.type === 'quarterly' ? '분기' :
                              report.type === 'annual' ? '연간' : '커스텀'
                            } 
                            size="small" 
                            color={
                              report.type === 'monthly' ? 'primary' : 
                              report.type === 'quarterly' ? 'secondary' :
                              report.type === 'annual' ? 'warning' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{report.format.toUpperCase()}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button variant="outlined">모든 보고서 보기</Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>예약된 보고서</Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>제목</TableCell>
                      <TableCell>주기</TableCell>
                      <TableCell>다음 생성일</TableCell>
                      <TableCell>수신자</TableCell>
                      <TableCell>상태</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>{report.nextDate}</TableCell>
                        <TableCell>{report.recipients.join(', ')}</TableCell>
                        <TableCell>
                          <Chip 
                            label={report.status === 'active' ? '활성' : '비활성'} 
                            color={report.status === 'active' ? 'success' : 'default'}
                            size="small" 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button variant="contained">보고서 예약 추가</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>보고서 생성</Typography>
              
              <List>
                <ListItem button>
                  <ListItemText 
                    primary="월간 재무 보고서" 
                    secondary="현재 월의 재무 상태, 수입, 지출 요약"
                  />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText 
                    primary="지출 분석 보고서" 
                    secondary="카테고리별 지출 분석 및 추세"
                  />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText 
                    primary="투자 포트폴리오 보고서" 
                    secondary="투자 포트폴리오 성과 및 구성 분석"
                  />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText 
                    primary="순자산 보고서" 
                    secondary="자산, 부채 및 순자산 추이"
                  />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText 
                    primary="세금 보고서" 
                    secondary="세금 추정 및 절세 기회"
                  />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText 
                    primary="커스텀 보고서" 
                    secondary="필요에 맞는 맞춤형 보고서 생성"
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="contained" fullWidth>새 보고서 생성</Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>보고서 설정</Typography>
              
              <List>
                <ListItem button>
                  <ListItemText primary="보고서 템플릿 관리" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="자동 보고서 일정 설정" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="이메일 전송 설정" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="보고서 아카이브 관리" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}; 