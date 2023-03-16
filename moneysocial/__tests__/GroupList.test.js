import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GroupList from '../app/screens/GroupStuff/groupList';
import { TouchableOpacity, Text } from 'react-native';
import renderer from 'react-test-renderer';
import { renderGroup } from '../app/screens/GroupStuff/groupList';


describe('GroupList component', () => {
  it('should render loading indicator if loading is true', () => {
    const { getByText } = render(<GroupList testLoad={true} />);
    expect(getByText('Loading...')).toBeDefined();
  });

  test('renders correctly', () => {
    const item = { id: 1, name: 'Group 1', groupKey: 'ABC' };
    const tree = renderer.create(<renderGroup item={item} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
