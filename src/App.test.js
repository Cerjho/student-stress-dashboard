import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const heading = screen.getByText(/Student Stress Analysis Dashboard/i);
  expect(heading).toBeInTheDocument();
});
