import React from 'react';
import { render, screen } from '@testing-library/react';
import { RetailerDetail } from './RetailerDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

test('renders RetailerDetail with correct ID', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/retailer/:id" element={<RetailerDetail />} />
      </Routes>
    </BrowserRouter>,
    { route: '/retailer/1' }
  );

  expect(screen.getByText(/리테일러 ID: 1/i)).toBeInTheDocument();
}); 