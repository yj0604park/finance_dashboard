import { Box, Typography, Card, CardContent, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button, Chip, Stack, TextField, IconButton, Tab, Tabs, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { formatCurrency } from '../../utils/currency';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FilterListIcon from '@mui/icons-material/FilterList';

// 샘플 관심 상품 데이터
const wishlistItems = [
  { 
    id: 1, 
    name: 'Apple MacBook Pro 14"', 
    price: 2190000, 
    originalPrice: 2500000, 
    discount: 12.4, 
    category: '전자제품',
    store: '애플 스토어',
    image: 'macbook.jpg',
    priceHistory: [
      { date: '2023-01-15', price: 2500000 },
      { date: '2023-02-01', price: 2400000 },
      { date: '2023-02-15', price: 2300000 },
      { date: '2023-03-01', price: 2190000 },
    ]
  },
  { 
    id: 2, 
    name: '다이슨 에어랩', 
    price: 598000, 
    originalPrice: 699000, 
    discount: 14.5, 
    category: '가전제품',
    store: '다이슨 공식몰',
    image: 'dyson.jpg',
    priceHistory: [
      { date: '2023-01-01', price: 699000 },
      { date: '2023-01-15', price: 699000 },
      { date: '2023-02-01', price: 649000 },
      { date: '2023-03-01', price: 598000 },
    ]
  },
  { 
    id: 3, 
    name: '나이키 에어맥스 90', 
    price: 139000, 
    originalPrice: 159000, 
    discount: 12.6, 
    category: '의류/패션',
    store: '나이키 공식몰',
    image: 'nike.jpg',
    priceHistory: [
      { date: '2023-01-01', price: 159000 },
      { date: '2023-02-01', price: 159000 },
      { date: '2023-02-15', price: 149000 },
      { date: '2023-03-01', price: 139000 },
    ]
  },
  { 
    id: 4, 
    name: '삼성 QLED TV', 
    price: 1890000, 
    originalPrice: 2290000, 
    discount: 17.5, 
    category: '전자제품',
    store: '삼성전자',
    image: 'samsung.jpg',
    priceHistory: [
      { date: '2023-01-01', price: 2290000 },
      { date: '2023-01-15', price: 2190000 },
      { date: '2023-02-01', price: 2090000 },
      { date: '2023-03-01', price: 1890000 },
    ]
  },
];

// 샘플 가격 알림 데이터
const priceAlerts = [
  { 
    id: 1, 
    name: 'LG 그램 노트북', 
    targetPrice: 1500000, 
    currentPrice: 1690000, 
    initialPrice: 1890000, 
    store: 'LG 베스트샵',
    priceGap: 190000
  },
  { 
    id: 2, 
    name: '소니 헤드폰 WH-1000XM5', 
    targetPrice: 399000, 
    currentPrice: 429000, 
    initialPrice: 449000, 
    store: '소니 스토어',
    priceGap: 30000
  },
  { 
    id: 3, 
    name: '캐논 DSLR 카메라', 
    targetPrice: 1000000, 
    currentPrice: 1099000, 
    initialPrice: 1299000, 
    store: '캐논 스토어',
    priceGap: 99000
  },
];

// 샘플 장바구니 데이터
const cartItems = [
  { 
    id: 1, 
    name: '아이패드 프로 11인치', 
    price: 999000, 
    quantity: 1,
    store: '애플 스토어'
  },
  { 
    id: 2, 
    name: '에어팟 프로 2세대', 
    price: 329000, 
    quantity: 1,
    store: '애플 스토어'
  },
  { 
    id: 3, 
    name: '필립스 전동칫솔', 
    price: 89000, 
    quantity: 2,
    store: '필립스 공식몰'
  },
];

export const Shopping = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // 장바구니 총액 계산
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 관심 상품 총 할인액
  const totalDiscountAmount = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>쇼핑 도우미</Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="상품명, 카테고리 또는 스토어 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <FilterListIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="관심 상품" icon={<FavoriteBorderIcon />} iconPosition="start" />
          <Tab label="가격 알림" icon={<LocalOfferIcon />} iconPosition="start" />
          <Tab label="장바구니" icon={<ShoppingCartIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {tabValue === 0 && (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">관심 상품</Typography>
            <Typography variant="body2" color="success.main">
              총 할인 혜택: {formatCurrency(totalDiscountAmount, 'KRW')}
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{item.name}</Typography>
                      <IconButton color="primary">
                        <FavoriteIcon />
                      </IconButton>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={7}>
                        <Box sx={{ mb: 1 }}>
                          <Typography color="text.secondary" variant="body2">스토어</Typography>
                          <Typography>{item.store}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography color="text.secondary" variant="body2">카테고리</Typography>
                          <Typography>{item.category}</Typography>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Typography color="text.secondary" variant="body2">가격</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 500, mr: 1 }}>
                              {formatCurrency(item.price, 'KRW')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 1 }}>
                              {formatCurrency(item.originalPrice, 'KRW')}
                            </Typography>
                            <Chip
                              label={`${item.discount}% 할인`}
                              color="error"
                              size="small"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Box sx={{ 
                          height: 120, 
                          backgroundColor: '#f5f5f5', 
                          borderRadius: 1, 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          border: '1px dashed #ddd' 
                        }}>
                          <Typography color="text.secondary" variant="body2" sx={{ textAlign: 'center' }}>
                            [상품 이미지]
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 2 }}>
                      <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>가격 변동 추이</Typography>
                      <Box sx={{ 
                        height: 80, 
                        backgroundColor: '#f9f9f9', 
                        borderRadius: 1, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        border: '1px dashed #ddd' 
                      }}>
                        <Typography color="text.secondary" variant="body2">
                          [가격 변동 그래프]
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button variant="outlined" startIcon={<LocalOfferIcon />} size="small">
                        가격 알림 설정
                      </Button>
                      <Button variant="contained" startIcon={<AddShoppingCartIcon />} size="small">
                        장바구니 담기
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      {tabValue === 1 && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">가격 알림</Typography>
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>상품명</TableCell>
                  <TableCell>스토어</TableCell>
                  <TableCell align="right">목표 가격</TableCell>
                  <TableCell align="right">현재 가격</TableCell>
                  <TableCell align="right">가격 차이</TableCell>
                  <TableCell align="right">액션</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.name}</TableCell>
                    <TableCell>{alert.store}</TableCell>
                    <TableCell align="right">{formatCurrency(alert.targetPrice, 'KRW')}</TableCell>
                    <TableCell align="right">
                      <Box>
                        {formatCurrency(alert.currentPrice, 'KRW')}
                        <Typography variant="caption" color="text.secondary" display="block">
                          최초: {formatCurrency(alert.initialPrice, 'KRW')}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={`${formatCurrency(alert.priceGap, 'KRW')} 차이`}
                        color={alert.priceGap < 50000 ? 'warning' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" size="small">수정</Button>
                        <Button variant="contained" size="small" color="error">삭제</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained">새 가격 알림 추가</Button>
          </Box>
        </>
      )}
      
      {tabValue === 2 && (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">장바구니</Typography>
            <Typography variant="h6" color="primary.main">
              총액: {formatCurrency(cartTotal, 'KRW')}
            </Typography>
          </Box>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>상품명</TableCell>
                  <TableCell>스토어</TableCell>
                  <TableCell align="right">가격</TableCell>
                  <TableCell align="right">수량</TableCell>
                  <TableCell align="right">소계</TableCell>
                  <TableCell align="right">액션</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.store}</TableCell>
                    <TableCell align="right">{formatCurrency(item.price, 'KRW')}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(item.price * item.quantity, 'KRW')}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button variant="outlined" size="small">수정</Button>
                        <Button variant="contained" size="small" color="error">삭제</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="outlined" sx={{ mr: 2 }}>쇼핑 계속하기</Button>
            <Button variant="contained">구매하기</Button>
          </Box>
        </>
      )}
    </Box>
  );
}; 