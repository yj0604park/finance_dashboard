import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionList from './TransactionList';
import { BrowserRouter } from 'react-router-dom';

// @mui/material 모듈 모의 설정
jest.mock('@mui/material', () => {
  const originalModule = jest.requireActual('@mui/material');
  return {
    __esModule: true,
    ...originalModule,
    IconButton: (props) => <button {...props} />,
  };
});

test('renders TransactionList', () => {
  render(
    <BrowserRouter>
      <TransactionList />
    </BrowserRouter>
  );

  expect(screen.getByText(/거래 내역/i)).toBeInTheDocument();
});

test('filters transactions based on search input', () => {
  render(
    <BrowserRouter>
      <TransactionList />
    </BrowserRouter>
  );

  const searchInput = screen.getByPlaceholderText(/검색/i);
  fireEvent.change(searchInput, { target: { value: 'ABC' } });

  expect(screen.getByText(/ABC Mart/i)).toBeInTheDocument();
  expect(screen.queryByText(/XYZ Cafe/i)).not.toBeInTheDocument();
});

test('navigates to retailer detail on retailer click', () => {
  render(
    <BrowserRouter>
      <TransactionList />
    </BrowserRouter>
  );

  const retailerLink = screen.getByText(/ABC Mart/i);
  fireEvent.click(retailerLink);

  expect(window.location.pathname).toBe('/retailer/1');
}); 