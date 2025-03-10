import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const RetailerDetail = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: 리테일러 정보를 가져오는 로직 추가

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        리테일러 상세 정보
      </Typography>
      <Typography variant="body1">
        리테일러 ID: {id}
      </Typography>
      {/* 리테일러의 상세 정보를 여기에 표시 */}
    </Box>
  );
};

export default RetailerDetail; 