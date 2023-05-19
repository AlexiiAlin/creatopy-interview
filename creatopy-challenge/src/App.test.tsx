import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemsPage from './pages/ItemsPage';

test('renders learn react link', () => {
  render(<ItemsPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
