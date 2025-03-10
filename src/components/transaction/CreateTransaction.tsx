import { useState } from 'react';
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
  Container,
  Alert,
  Checkbox,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { useCreateTransaction, useRetailerList } from '../../hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ko from 'date-fns/locale/ko'; // 한국어 로케일
import { RetailerCreateDialog } from '../retailer/RetailerCreateDialog';

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

  const handleOpenRetailerDialog = () => {
    setOpenRetailerDialog(true);
  };

  const handleCloseRetailerDialog = () => {
    setOpenRetailerDialog(false);
  };

  const handleRetailerSuccess = (retailerId: string) => {
    refetchRetailers();
    setSuccessMessage('판매자가 성공적으로 추가되었습니다.');

    // 새로 추가된 판매자를 현재 트랜잭션에 자동 선택
    if (transactionCreationDataList.length > 0) {
      const currentItem = transactionCreationDataList[transactionCreationDataList.length - 1];
      if (currentItem && currentItem.id) {
        setTransactionCreationData(currentItem.id)({
          ...currentItem,
          retailerId
        });
      }
    }
  };

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
                  <TableCell width="3%">#</TableCell>
                  <TableCell width="10%">날짜</TableCell>
                  <TableCell width="10%">타입</TableCell>
                  <TableCell width="20%">금액</TableCell>
                  <TableCell width="20%">판매자</TableCell>
                  <TableCell width="27%">메모</TableCell>
                  <TableCell width="10%">내부 이체</TableCell>
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
                      <FormControl fullWidth size="small">
                        <Select
                          value={item.type || 'EXPENSE'}
                          onChange={(e) =>
                            setTransactionCreationData(item.id!)({
                              ...item,
                              type: e.target.value as 'INCOME' | 'EXPENSE' | 'TRANSFER'
                            })
                          }
                        >
                          <MenuItem value="INCOME">수입</MenuItem>
                          <MenuItem value="EXPENSE">지출</MenuItem>
                          <MenuItem value="TRANSFER">이체</MenuItem>
                        </Select>
                      </FormControl>
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
        </Box>

        <RetailerCreateDialog
          open={openRetailerDialog}
          onClose={handleCloseRetailerDialog}
          onSuccess={handleRetailerSuccess}
        />
      </Container>
    </LocalizationProvider>
  );
}; 