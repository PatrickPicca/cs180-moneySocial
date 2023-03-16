import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../app/screens/HomeScreen';

describe('HomeScreen', () => {
  describe('Welcome message', () => {
    it('renders the correct welcome message', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Welcome John!')).toBeTruthy();
    });
  });

  describe('Monthly Budget', () => {
    it('renders the correct monthly budget', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Monthly Budget: $100')).toBeTruthy();
    });
  });

  describe('Monthly Expenses', () => {
    it('renders the correct monthly expenses', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Monthly Expenses: $50')).toBeTruthy();
    });
  });

  describe('Get All Groups button', () => {
    it('renders the Get All Groups button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Get All Groups')).toBeTruthy();
    });
  });

  describe('Get All Expenses button', () => {
    it('renders the Get All Expenses button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Get All Expenses')).toBeTruthy();
    });
  });

  describe('Get Group button', () => {
    it('renders the Get Group button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Get Group')).toBeTruthy();
    });
  });

  describe('Create Expense button', () => {
    it('renders the Create Expense button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('+')).toBeTruthy();
    });
  });
});

describe('GroupHome', () => {
  describe('Welcome message', () => {
    it('renders the correct welcome message', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Welcome John!')).toBeTruthy();
    });
  });

  describe('Monthly Budget', () => {
    it('renders the correct monthly budget', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Monthly Budget: $100')).toBeTruthy();
    });
  });

  describe('Monthly Expenses', () => {
    it('renders the correct monthly expenses', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Monthly Expenses: $50')).toBeTruthy();
    });
  });

  describe('Get All Groups button', () => {
    it('renders the Get All Groups button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Get All Groups')).toBeTruthy();
    });
  });

  describe('Get All Expenses button', () => {
    it('renders the Get All Expenses button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Get All Expenses')).toBeTruthy();
    });
  });

  describe('Get Group button', () => {
    it('renders the Get Group button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('Get Group')).toBeTruthy();
    });
  });

  describe('Create Expense button', () => {
    it('renders the Create Expense button', () => {
      const { getByText } = render(<HomeScreen myName="John" myValue1={100} myValue2={50} />);
      expect(getByText('+')).toBeTruthy();
    });
  });
});