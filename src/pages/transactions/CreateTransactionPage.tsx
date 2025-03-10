import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { RetailerDialog } from '../../components/retailer/RetailerDialog';

export const CreateTransactionPage: React.FC = () => {
  const [isRetailerDialogOpen, setIsRetailerDialogOpen] = useState(false);

  const handleOpenRetailerDialog = () => {
    setIsRetailerDialogOpen(true);
  };

  const handleCloseRetailerDialog = () => {
    setIsRetailerDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        거래 생성
      </Typography>
      <Button variant="contained" onClick={handleOpenRetailerDialog}>
        새 판매자 추가
      </Button>

      <RetailerDialog
        open={isRetailerDialogOpen}
        onClose={handleCloseRetailerDialog}
      />
    </Container>
  );
}; 