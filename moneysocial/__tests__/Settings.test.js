import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../app/screens/SettingsScreen';

describe('SettingsScreen', () => {
  it('should render the account info correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    const titleText = getByText('Account Info');

    expect(titleText).toBeTruthy();
  });
  it('should render the username correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    const usernameText = getByText('Username:');

    expect(usernameText).toBeTruthy();
  });

  it('should render the email correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    const emailText = getByText('Email:');

    expect(emailText).toBeTruthy();
  });

  it('should render the password correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    const passwordText = getByText('Password:');

    expect(passwordText).toBeTruthy();
  });

  it('should render the logout correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    const logoutButton = getByText('LOG OUT');

    expect(logoutButton).toBeTruthy();
  });


  it('should call the onSignOutClick function when logout button is pressed', () => {
    const onSignOutClick = jest.fn();
    const { getByText } = render(<SettingsScreen onSignOutClick={onSignOutClick} />);
    const logoutButton = getByText('LOG OUT');

    fireEvent.press(logoutButton);

    expect(onSignOutClick).toHaveBeenCalled();
  });
});
