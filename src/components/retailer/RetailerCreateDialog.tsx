import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
  CircularProgress
} from '@mui/material';
import { useGetRetailerTypeQuery, useCreateRetailerMutation, TransactionCategory, RetailerInput, RetailerType, useGetTransactionCategoryQuery } from '../../generated/graphql';
import { useState } from 'react';

interface RetailerCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (retailerId: string) => void;
}

export const RetailerCreateDialog = ({ open, onClose, onSuccess }: RetailerCreateDialogProps) => {
  const [newRetailer, setNewRetailer] = useState<RetailerInput>({
    name: '',
    category: TransactionCategory.Etc,
    type: RetailerType.Etc
  });
  const [retailerDialogError, setRetailerDialogError] = useState<string | null>(null);

  // 판매자 타입 쿼리
  const { data: retailerTypesData, loading: retailerTypesLoading } = useGetRetailerTypeQuery();

  // 판매자 카테고리 쿼리
  const { data: transactionCategoriesData, loading: transactionCategoriesLoading } = useGetTransactionCategoryQuery();

  // 판매자 생성 뮤테이션
  const [createRetailer, { loading: createRetailerLoading }] = useCreateRetailerMutation({
    onCompleted: (data) => {
      if (data?.createRetailer?.id) {
        onSuccess(data.createRetailer.id);
      }
      handleClose();
    },
    onError: (error) => {
      setRetailerDialogError(error.message || '판매자 추가 중 오류가 발생했습니다.');
    }
  });

  const handleClose = () => {
    setNewRetailer({
      name: '',
      category: TransactionCategory.Etc,
      type: RetailerType.Etc
    });
    setRetailerDialogError(null);
    onClose();
  };

  const translateTransactionCategory = (category: string) => {
    switch (category) {
      case 'ETC':
        return '기타';
      case 'GROCERY':
        return '식료품';
      case 'EAT_OUT':
        return '외식';
      case 'CLOTHING':
        return '의류';
      case 'TRANSPORTATION':
        return '교통';
      case 'HOUSING':
        return '주거';
      case 'MEDICAL':
        return '의료';
      case 'LEISURE':
        return '여가';
      case 'MEMBERSHIP':
        return '멤버십';
      case 'SERVICE':
        return '서비스';
      case 'DAILY_NECESSITY':
        return '생필품';
      case 'PARENTING':
        return '육아';
      case 'PRESENT':
        return '선물';
      case 'TRANSFER':
        return '이체';
      case 'CASH':
        return '현금';
      case 'INTEREST':
        return '이자';
      case 'INCOME':
        return '수입';
      case 'STOCK':
        return '주식';
      default:
        return category;
    }
  };

  const handleSubmit = () => {
    if (!newRetailer?.name.trim()) {
      setRetailerDialogError('판매자 이름을 입력해주세요.');
      return;
    }

    if (!newRetailer?.category) {
      setRetailerDialogError('카테고리를 선택해주세요.');
      return;
    }

    if (!newRetailer?.type) {
      setRetailerDialogError('판매자 타입을 선택해주세요.');
      return;
    }

    createRetailer({
      variables: {
        name: newRetailer.name.trim(),
        category: newRetailer.category,
        type: newRetailer.type
      }
    });
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setNewRetailer(prev => ({
      ...prev,
      name: prev?.name || '',
      type: event.target.value as RetailerType
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setNewRetailer(prev => ({
      ...prev,
      name: prev?.name || '',
      category: event.target.value as TransactionCategory
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
          value={newRetailer?.name || ''}
          onChange={(e) => setNewRetailer(prev => ({
            ...prev,
            name: e.target.value
          }))}
          sx={{ mb: 2, mt: 1 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="type-select-label">판매자 타입</InputLabel>
          <Select
            labelId="type-select-label"
            value={newRetailer?.type || ''}
            label="판매자 타입"
            onChange={handleTypeChange}
          >
            {retailerTypesLoading ? (
              <MenuItem value="">
                <CircularProgress size={20} sx={{ mr: 1 }} />
                로딩 중...
              </MenuItem>
            ) : (
              retailerTypesData?.__type?.enumValues?.map((type: { name: string }) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="category-select-label">카테고리</InputLabel>
          <Select
            labelId="category-select-label"
            value={newRetailer?.category || ''}
            label="카테고리"
            onChange={handleCategoryChange}
          >
            {transactionCategoriesLoading ? (
              <MenuItem value="">
                <CircularProgress size={20} sx={{ mr: 1 }} />
                로딩 중...
              </MenuItem>
            ) : (
              transactionCategoriesData?.__type?.enumValues?.map((category: { name: string }) => (
                <MenuItem key={category.name} value={category.name}>
                  {translateTransactionCategory(category.name)}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          onClick={handleSubmit}
          disabled={createRetailerLoading || !newRetailer?.name.trim() || retailerTypesLoading}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 