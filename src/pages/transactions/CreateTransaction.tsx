import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, Grid, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import { useGetBankNodeWithBalanceQuery } from '../../generated/graphql';
import { useCreateTransaction, useRetailerList } from '../../hooks';
import { CreateTransaction as TransactionForm } from '../../components/transaction/CreateTransaction';
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from '@apollo/client';
import { CREATE_RETAILER } from '../../graphql/mutations/retailerMutations';

export const CreateTransactionPage = () => {
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [accounts, setAccounts] = useState<Array<{ id: string; name: string }>>([]);
  
  // 판매자 관리 관련 상태
  const [openRetailerDialog, setOpenRetailerDialog] = useState(false);
  const [newRetailerName, setNewRetailerName] = useState('');
  const [newRetailerCategory, setNewRetailerCategory] = useState('ETC');
  const [retailerDialogError, setRetailerDialogError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { data: bankData, loading: bankLoading } = useGetBankNodeWithBalanceQuery();
  
  // 판매자 목록 가져오기
  const { retailers, refetch: refetchRetailers } = useRetailerList();
  
  // 판매자 생성 뮤테이션
  const [createRetailer, { loading: createRetailerLoading }] = useMutation(CREATE_RETAILER, {
    onCompleted: () => {
      refetchRetailers();
      handleCloseRetailerDialog();
      setSuccessMessage('판매자가 성공적으로 추가되었습니다.');
      
      // 3초 후 성공 메시지 제거
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    },
    onError: (error) => {
      setRetailerDialogError(error.message || '판매자 추가 중 오류가 발생했습니다.');
    }
  });
  
  // 은행 데이터가 로드될 때 계좌 목록 초기화
  useEffect(() => {
    if (!bankData || !selectedBank) return;
    
    // 선택된 은행 찾기
    const bankEdge = bankData.bankRelay.edges.find(
      edge => String(edge.node.id) === selectedBank
    );
    
    if (!bankEdge) return;
    
    // 계좌 정보 가져오기
    const bankAccounts: Array<{ id: string; name: string }> = [];
    
    // 계좌 정보가 있는지 확인
    if (bankEdge.node.accountSet && 
        bankEdge.node.accountSet.edges) {
      // 각 계좌 정보를 배열에 추가
      bankEdge.node.accountSet.edges.forEach(accountEdge => {
        if (accountEdge && accountEdge.node) {
          bankAccounts.push({
            id: String(accountEdge.node.id),
            name: accountEdge.node.name
          });
        }
      });
    }
    
    setAccounts(bankAccounts);
    
    // 이전에 선택된 계좌가 현재 계좌 목록에 없는 경우 선택 초기화
    if (selectedAccount && !bankAccounts.some(acc => acc.id === selectedAccount)) {
      setSelectedAccount('');
    }
  }, [bankData, selectedBank]);

  // 은행 변경 처리
  const handleBankChange = (event: SelectChangeEvent) => {
    setSelectedBank(event.target.value);
  };

  // 계좌 변경 처리
  const handleAccountChange = (event: SelectChangeEvent) => {
    setSelectedAccount(event.target.value);
  };
  
  // 판매자 추가 대화상자 열기
  const handleOpenRetailerDialog = () => {
    setOpenRetailerDialog(true);
    setNewRetailerName('');
    setNewRetailerCategory('ETC');
    setRetailerDialogError(null);
  };
  
  // 판매자 추가 대화상자 닫기
  const handleCloseRetailerDialog = () => {
    setOpenRetailerDialog(false);
  };
  
  // 판매자 추가 제출
  const handleSubmitRetailer = () => {
    if (!newRetailerName.trim()) {
      setRetailerDialogError('판매자 이름을 입력해주세요.');
      return;
    }
    
    createRetailer({
      variables: {
        name: newRetailerName.trim(),
        category: newRetailerCategory
      }
    });
  };
  
  // 카테고리 변경 처리
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setNewRetailerCategory(event.target.value);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100%', px: 0 }}>
      <Box sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
            거래 생성
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />} 
            onClick={handleOpenRetailerDialog}
            size="small"
          >
            새 판매자 추가
          </Button>
        </Box>
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={bankLoading}>
                <InputLabel id="bank-select-label">은행</InputLabel>
                <Select
                  labelId="bank-select-label"
                  id="bank-select"
                  value={selectedBank}
                  onChange={handleBankChange}
                  label="은행"
                >
                  {bankData?.bankRelay.edges.map(edge => (
                    <MenuItem key={String(edge.node.id)} value={String(edge.node.id)}>
                      {edge.node.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth disabled={!selectedBank || accounts.length === 0}>
                <InputLabel id="account-select-label">계좌</InputLabel>
                <Select
                  labelId="account-select-label"
                  id="account-select"
                  value={selectedAccount}
                  onChange={handleAccountChange}
                  label="계좌"
                >
                  {accounts.map(account => (
                    <MenuItem key={account.id} value={account.id}>
                      {account.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        
        {selectedAccount ? (
          <TransactionForm accountId={selectedAccount} />
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              거래 생성을 시작하려면 계좌를 선택해주세요.
            </Typography>
          </Paper>
        )}
        
        {/* 판매자 추가 대화상자 */}
        <Dialog open={openRetailerDialog} onClose={handleCloseRetailerDialog}>
          <DialogTitle>새 판매자 추가</DialogTitle>
          <DialogContent>
            {retailerDialogError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {retailerDialogError}
              </Alert>
            )}
            <TextField
              autoFocus
              margin="dense"
              label="판매자 이름"
              fullWidth
              variant="outlined"
              value={newRetailerName}
              onChange={(e) => setNewRetailerName(e.target.value)}
              sx={{ mb: 2, mt: 1 }}
            />
            
            <FormControl fullWidth>
              <InputLabel id="category-select-label">카테고리</InputLabel>
              <Select
                labelId="category-select-label"
                value={newRetailerCategory}
                label="카테고리"
                onChange={handleCategoryChange}
              >
                <MenuItem value="ETC">기타</MenuItem>
                <MenuItem value="GROCERY">식료품</MenuItem>
                <MenuItem value="EAT_OUT">외식</MenuItem>
                <MenuItem value="CLOTHING">의류</MenuItem>
                <MenuItem value="TRANSPORTATION">교통</MenuItem>
                <MenuItem value="HOUSING">주거</MenuItem>
                <MenuItem value="MEDICAL">의료</MenuItem>
                <MenuItem value="LEISURE">여가</MenuItem>
                <MenuItem value="MEMBERSHIP">멤버십</MenuItem>
                <MenuItem value="SERVICE">서비스</MenuItem>
                <MenuItem value="DAILY_NECESSITY">생필품</MenuItem>
                <MenuItem value="PARENTING">육아</MenuItem>
                <MenuItem value="PRESENT">선물</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRetailerDialog}>취소</Button>
            <Button 
              onClick={handleSubmitRetailer} 
              disabled={createRetailerLoading || !newRetailerName.trim()}
            >
              추가
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}; 