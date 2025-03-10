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
  Stack,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';

interface TransactionCreateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: number;
    date: string;
    isInternal?: boolean;
    note?: string;
  }) => void;
  currency: string;
}

export const TransactionCreateModal = ({
  open,
  onClose,
  onSubmit,
  currency
}: TransactionCreateModalProps) => {
  const [type, setType] = useState('DEPOSIT');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [isInternal, setIsInternal] = useState(false);

  const handleSubmit = () => {
    if (!date) return;
    
    onSubmit({
      amount: type === 'WITHDRAW' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      date: date.toISOString(),
      isInternal,
      note: note || undefined
    });
    
    setType('DEPOSIT');
    setAmount('');
    setNote('');
    setDate(new Date());
    setIsInternal(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>거래 내역 추가</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>거래 종류</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="거래 종류"
            >
              <MenuItem value="DEPOSIT">입금</MenuItem>
              <MenuItem value="WITHDRAW">출금</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="금액"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">{currency}</InputAdornment>,
            }}
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
            <DatePicker
              label="거래 날짜"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>

          <TextField
            label="메모"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isInternal}
                onChange={(e) => setIsInternal(e.target.checked)}
              />
            }
            label="내부 거래 (계좌 간 이체)"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!amount || Number(amount) <= 0 || !date}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 