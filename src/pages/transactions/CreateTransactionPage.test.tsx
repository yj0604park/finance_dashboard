import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateTransactionPage } from './CreateTransactionPage';
import { BrowserRouter } from 'react-router-dom';

test('renders CreateTransactionPage', () => {
  render(
    <BrowserRouter>
      <CreateTransactionPage />
    </BrowserRouter>
  );

  expect(screen.getByText(/거래 생성/i)).toBeInTheDocument();
});

test('opens and closes retailer dialog', () => {
  render(
    <BrowserRouter>
      <CreateTransactionPage />
    </BrowserRouter>
  );

  const addButton = screen.getByText(/새 판매자 추가/i);
  fireEvent.click(addButton);

  expect(screen.getByText(/새 판매자 추가/i)).toBeInTheDocument();

  const cancelButton = screen.getByText(/취소/i);
  fireEvent.click(cancelButton);

  expect(screen.queryByText(/새 판매자 추가/i)).not.toBeInTheDocument();
}); 