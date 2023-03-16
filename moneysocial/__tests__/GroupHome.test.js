import React from 'react';
import { render } from '@testing-library/react-native';
import GroupHome from "../app/screens/GroupStuff/GroupHome";

describe('GroupHome component', () => {
    it('renders correctly', () => {
      render(<GroupHome id='1' />);
    });
  });
  