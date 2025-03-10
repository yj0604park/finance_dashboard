import { Typography } from '@mui/material';

interface ErrorScreenProps {
  message: string;
}

export const ErrorScreen = ({ message }: ErrorScreenProps) => {
  return (
    <Typography color="error">
      에러가 발생했습니다: {message}
    </Typography>
  );
}; 