import React from 'react';
import { render } from '@testing-library/react-native';
import ExpenseList from "../app/screens/ExpenseListScreen";
import renderer from 'react-test-renderer';
import { renderItem } from '../app/screens/ExpenseListScreen';

describe('Expense List component', () => {
    it('renders correctly', () => {
      render(<ExpenseList id='1' />);
    });
    
  });

test('renders correctly', () => {
  const item = { id: 1, category: 'Food', amount: 10.0, description: 'Groceries' };
  const editingId = null;
  const category = '';
  const amount = '';
  const description = '';
  const handleEdit = jest.fn();
  const handleRemove = jest.fn();
  const handleUpdate = jest.fn();

  const tree = renderer.create(
    <renderItem
      item={item}
      editingId={editingId}
      category={category}
      amount={amount}
      description={description}
      handleEdit={handleEdit}
      handleRemove={handleRemove}
      handleUpdate={handleUpdate}
    />
  ).toJSON();
  
  expect(tree).toMatchSnapshot();
});


  