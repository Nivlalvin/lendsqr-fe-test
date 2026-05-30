import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe('Login Page', () => {
  // Positive tests
  it('renders the login page correctly', () => {
    renderLogin();
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('renders the login button', () => {
    renderLogin();
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    renderLogin();
    expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
  });

  it('toggles password visibility when SHOW is clicked', () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText('Password');
    const showBtn = screen.getByText('SHOW');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(showBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(showBtn);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('accepts email input correctly', () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@lendsqr.com' } });
    expect(emailInput).toHaveValue('test@lendsqr.com');
  });

  it('accepts password input correctly', () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  // Negative tests
  it('shows error when form is submitted empty', async () => {
    renderLogin();
    fireEvent.click(screen.getByText('LOG IN'));
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('shows error for invalid email format', async () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByText('LOG IN'));
    await waitFor(() => {
      expect(
        screen.getByText('Enter a valid email address')
      ).toBeInTheDocument();
    });
  });

  it('shows error for password less than 6 characters', async () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText('LOG IN'));
    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 6 characters')
      ).toBeInTheDocument();
    });
  });

  it('clears email error when user starts typing', async () => {
    renderLogin();
    fireEvent.click(screen.getByText('LOG IN'));
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'a' },
    });
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });
});