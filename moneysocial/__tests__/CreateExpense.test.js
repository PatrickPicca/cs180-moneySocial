import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateExpenseScreen from '../app/screens/createExpenseScreen';

describe('CreateExpenseScreen', () => {
  describe('Rendering', () => {
    it('should render the category input', () => {
      const { getByPlaceholderText } = render(<CreateExpenseScreen />);
      const categoryInput = getByPlaceholderText('Category');

      expect(categoryInput).toBeTruthy();
    });

    it('should render the description input', () => {
      const { getByPlaceholderText } = render(<CreateExpenseScreen />);
      const descInput = getByPlaceholderText('Description');

      expect(descInput).toBeTruthy();
    });

    it('should render the amount input', () => {
      const { getByPlaceholderText } = render(<CreateExpenseScreen />);
      const amountInput = getByPlaceholderText('Amount');

      expect(amountInput).toBeTruthy();
    });

  });

  describe('Input handling', () => {
    it('should update the category state when category input value changes', () => {
      const { getByPlaceholderText } = render(<CreateExpenseScreen />);
      const categoryInput = getByPlaceholderText('Category');

      fireEvent.changeText(categoryInput, 'Groceries');

      expect(categoryInput.props.value).toBe('Groceries');
    });

    it('should update the description state when description input value changes', () => {
      const { getByPlaceholderText } = render(<CreateExpenseScreen />);
      const descInput = getByPlaceholderText('Description');

      fireEvent.changeText(descInput, 'Bought some vegetables');

      expect(descInput.props.value).toBe('Bought some vegetables');
    });

    it('should update the amount state when amount input value changes', () => {
      const { getByPlaceholderText } = render(<CreateExpenseScreen />);
      const amountInput = getByPlaceholderText('Amount');

      fireEvent.changeText(amountInput, '20');

      expect(amountInput.props.value).toBe('20');
    });
  });
});
