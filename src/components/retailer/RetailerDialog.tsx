import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface RetailerDialogProps {
  open: boolean;
  onClose: () => void;
}

export const RetailerDialog: React.FC<RetailerDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>새 판매자 추가</DialogTitle>
      <DialogContent>
        {/* 판매자 추가 폼 내용은 여기에 추가될 예정입니다 */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}; 