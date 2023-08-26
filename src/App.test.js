import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the scavenger hunt instructions', () => {
  render(<App />);
  const instructionsElement = screen.getByText(/Welcome to the Scavenger Hunt game!/i);
  expect(instructionsElement).toBeInTheDocument();
});

test('renders the hint paragraph', () => {
  render(<App />);
  const hintText = "A bent limb touching earth, displays of affection and a long-lasting commitment?";
  const hintElement = screen.getByText(hintText);
  expect(hintElement).toBeInTheDocument();
});


test('renders the clear all button', () => {
  render(<App />);
  const clearAllButton = screen.getByRole('button', { name: /Clear All/i });
  expect(clearAllButton).toBeInTheDocument();
});
