import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  Alert,
  Checkbox
} from '@mui/material';
import { useCreateTransaction, useRetailerList } from '../../hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ko from 'date-fns/locale/ko'; // 한국어 로케일
import { useMutation } from '@apollo/client';
import { CREATE_RETAILER } from '../../graphql/mutations/retailerMutations';

// 날짜 변환 함수
const formatDateToString = (date: Date | null): string => {
  if (!date) return '';
  return date.toISOString().split('T')[0];
};

const parseStringToDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  return new Date(dateString);
};

interface CreateTransactionProps {
  accountId: string;
}

export const CreateTransaction = ({ accountId }: CreateTransactionProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // 판매자 추가 대화상자 상태
  const [openRetailerDialog, setOpenRetailerDialog] = useState(false);
  const [newRetailerName, setNewRetailerName] = useState('');
  const [newRetailerCategory, setNewRetailerCategory] = useState('ETC');
  const [newRetailerType, setNewRetailerType] = useState('ETC');
  const [retailerDialogError, setRetailerDialogError] = useState<string | null>(null);
  const [newRetailerSuccess, setNewRetailerSuccess] = useState<boolean>(false);
  const [newRetailerId, setNewRetailerId] = useState<string | null>(null);
  
  const {
    transactionCreationDataList,
    setTransactionCreationData,
    addNewRow,
    onIsInternalChange,
    onRetailerChange,
    submitRequest,
    mutationLoading,
    resetTransactionCreationDataList
  } = useCreateTransaction({ accountId });
  
  // 판매자 관련
  const { 
    retailers, 
    loading: retailerLoading,
    refetch: refetchRetailers
  } = useRetailerList();
  
  // 판매자 생성 뮤테이션
  const [createRetailer, { loading: createRetailerLoading }] = useMutation(CREATE_RETAILER, {
    onCompleted: (data) => {
      // 성공 후 판매자 목록 새로고침
      refetchRetailers();
      
      // 대화상자 닫기
      handleCloseRetailerDialog();
      
      // 성공 메시지 표시
      setSuccessMessage('판매자가 성공적으로 추가되었습니다.');
      
      // 새로 추가된 판매자를 현재 트랜잭션에 자동 선택
      if (data && data.createRetailer && transactionCreationDataList.length > 0) {
        const currentItem = transactionCreationDataList[transactionCreationDataList.length - 1];
        if (currentItem && currentItem.id) {
          setTransactionCreationData(currentItem.id)({
            ...currentItem,
            retailerId: data.createRetailer.id
          });
        }
      }
    },
    onError: (error) => {
      setRetailerDialogError(error.message || '판매자 추가 중 오류가 발생했습니다.');
    }
  });
  
  const handleSubmit = async () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      const results = await submitRequest();
      const successCount = results.filter(r => r && !r.errors).length;
      
      if (successCount > 0) {
        setSuccessMessage(`${successCount} 트랜잭션이 성공적으로 생성되었습니다.`);
        resetTransactionCreationDataList(); // 성공 후 폼 초기화
      } else {
        setErrorMessage('트랜잭션을 생성하지 못했습니다.');
      }
    } catch (error) {
      setErrorMessage('트랜잭션 생성 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 행 삭제 함수
  const handleDeleteRow = (id: number) => {
    // 마지막 행은 삭제하지 않음
    if (transactionCreationDataList.length <= 1) {
      return;
    }

    // id에 해당하는 행 제거
    const newList = transactionCreationDataList.filter(item => item.id !== id);
    if (newList.length > 0) {
      // ID 재할당하여 연속성 유지
      const reindexedList = newList.map((item, index) => ({
        ...item,
        id: index + 1
      }));
      
      // 상태 업데이트
      return resetTransactionCreationDataList();
    }
  };
  
  // 판매자 옵션 찾기
  const findRetailerOption = (retailerId: string | number | undefined) => {
    if (!retailerId) return null;
    
    return retailers.find(option => option.id === String(retailerId)) || null;
  };
  
  // 판매자 추가 대화상자 열기
  const handleOpenRetailerDialog = () => {
    setOpenRetailerDialog(true);
    setNewRetailerName('');
    setNewRetailerCategory('ETC');
    setNewRetailerType('ETC');
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
  
  // 타입 변경 처리
  const handleTypeChange = (event: SelectChangeEvent) => {
    setNewRetailerType(event.target.value);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Container maxWidth={false} disableGutters sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, width: '100%', maxWidth: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
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
          </Stack>
          
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          
          <TableContainer component={Paper} sx={{ mb: 3, width: '100%', overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: 1200 }}>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                  <TableCell width="5%">#</TableCell>
                  <TableCell width="13%">날짜</TableCell>
                  <TableCell width="12%">금액</TableCell>
                  <TableCell width="20%">판매자</TableCell>
                  <TableCell width="30%">메모</TableCell>
                  <TableCell width="10%">내부 이체</TableCell>
                  <TableCell width="10%" align="center">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionCreationDataList.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <DatePicker
                        value={parseStringToDate(item.date)}
                        onChange={(newDate) => 
                          setTransactionCreationData(item.id!)({
                            ...item,
                            date: formatDateToString(newDate)
                          })
                        }
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            variant: "outlined"
                          }
                        }}
                        sx={{ minWidth: 140 }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        type="number"
                        variant="outlined"
                        size="small"
                        value={item.amount ?? ''}
                        onChange={(e) => 
                          setTransactionCreationData(item.id!)({
                            ...item,
                            amount: e.target.value ? Number(e.target.value) : null
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Autocomplete
                          options={retailers}
                          loading={retailerLoading}
                          getOptionLabel={(option) => option.name}
                          value={findRetailerOption(item.retailerId)}
                          onChange={(e, value) => 
                            onRetailerChange(item.id!)(e as any, value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              variant="outlined"
                              fullWidth
                              placeholder="판매자 선택"
                            />
                          )}
                          size="small"
                          sx={{ flexGrow: 1 }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={handleOpenRetailerDialog}
                          sx={{ flexShrink: 0 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={item.note}
                        onChange={(e) => 
                          setTransactionCreationData(item.id!)({
                            ...item,
                            note: e.target.value
                          })
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={item.isInternal}
                        onChange={onIsInternalChange(item.id!)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {transactionCreationDataList.length > 1 && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteRow(item.id!)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addNewRow}
            >
              새 트랜잭션 추가
            </Button>
            
            <Button 
              variant="contained"
              onClick={handleSubmit}
              disabled={mutationLoading}
            >
              모든 트랜잭션 저장
            </Button>
          </Stack>
          
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
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="type-select-label">판매자 타입</InputLabel>
                <Select
                  labelId="type-select-label"
                  value={newRetailerType}
                  label="판매자 타입"
                  onChange={handleTypeChange}
                >
                  <MenuItem value="ETC">로딩 중...</MenuItem>
                </Select>
              </FormControl>
              
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
    </LocalizationProvider>
  );
}; 