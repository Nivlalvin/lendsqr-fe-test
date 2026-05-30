import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../data/users.json', () => ({
  default: [],
}));

vi.mock('../utils/statusHelpers', () => ({
  getStatusClass: (status: string) => status.toLowerCase(),
  formatDate: (date: string) => date,
}));

vi.mock('../utils/storage', () => ({
  saveUserToStorage: vi.fn(),
  getUserFromStorage: vi.fn(),
  removeUserFromStorage: vi.fn(),
}));

vi.mock('../components/DashboardLayout/DashboardLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../hooks/useUsers', () => ({
  useUsers: () => ({
    users: [
      {
        id: '1',
        organization: 'Lendsqr',
        username: 'Grace Effiom',
        email: 'grace@lendsqr.com',
        phoneNumber: '07060780922',
        dateJoined: 'Apr 30, 2020 10:00 AM',
        status: 'Active',
        profile: {
          firstName: 'Grace',
          lastName: 'Effiom',
          phoneNumber: '07060780922',
          avatar: '',
          gender: 'Female',
          bvn: '12345678901',
          address: '10 Test Street',
          currency: 'NGN',
        },
        guarantor: {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '08098765432',
          gender: 'Male',
          address: '20 Street',
        },
        accountBalance: 50000,
        accountNumber: '1234567890',
        socials: {
          facebook: 'Grace Effiom',
          instagram: '@grace',
          twitter: '@grace',
        },
        education: {
          level: 'B.Sc',
          employmentStatus: 'Employed',
          sector: 'FinTech',
          duration: '2 years',
          officeEmail: 'grace@office.com',
          monthlyIncome: [100000, 200000],
          loanRepayment: 20000,
        },
        tier: 2,
      },
      {
        id: '2',
        organization: 'Irorun',
        username: 'Debby Ogana',
        email: 'debby@irorun.com',
        phoneNumber: '08160780928',
        dateJoined: 'Apr 30, 2020 10:00 AM',
        status: 'Pending',
        profile: {
          firstName: 'Debby',
          lastName: 'Ogana',
          phoneNumber: '08160780928',
          avatar: '',
          gender: 'Female',
          bvn: '98765432101',
          address: '5 Irorun Street',
          currency: 'NGN',
        },
        guarantor: {
          firstName: 'Jane',
          lastName: 'Smith',
          phoneNumber: '07012345678',
          gender: 'Female',
          address: '15 Street',
        },
        accountBalance: 30000,
        accountNumber: '0987654321',
        socials: {
          facebook: 'Debby Ogana',
          instagram: '@debby',
          twitter: '@debby',
        },
        education: {
          level: 'M.Sc',
          employmentStatus: 'Self-employed',
          sector: 'Education',
          duration: '3 years',
          officeEmail: 'debby@office.com',
          monthlyIncome: [80000, 150000],
          loanRepayment: 15000,
        },
        tier: 1,
      },
    ],
    loading: false,
    error: null,
  }),
}));

import Users from '../pages/Users/Users';

const renderUsers = () =>
  render(
    <MemoryRouter>
      <Users />
    </MemoryRouter>
  );

describe('Users Page', () => {
  // Positive tests
  it('renders the users page title', () => {
    renderUsers();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders all 4 stat cards', () => {
    renderUsers();
    expect(screen.getByText('USERS')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument();
    expect(screen.getByText('USERS WITH LOANS')).toBeInTheDocument();
    expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument();
  });

  it('renders table column headers', () => {
    renderUsers();
    expect(screen.getByText('ORGANIZATION')).toBeInTheDocument();
    expect(screen.getByText('USERNAME')).toBeInTheDocument();
    expect(screen.getByText('EMAIL')).toBeInTheDocument();
    expect(screen.getByText('PHONE NUMBER')).toBeInTheDocument();
    expect(screen.getByText('STATUS')).toBeInTheDocument();
  });

  it('renders user data in the table', () => {
    renderUsers();
    expect(screen.getByText('Grace Effiom')).toBeInTheDocument();
    expect(screen.getByText('Debby Ogana')).toBeInTheDocument();
  });

  it('renders correct status badges', () => {
    renderUsers();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('opens filter popover when filter icon is clicked', async () => {
    renderUsers();
    const filterButtons = screen.getAllByLabelText(/filter by/i);
    fireEvent.click(filterButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('Organization')).toBeInTheDocument();
      expect(screen.getByText('Username')).toBeInTheDocument();
    });
  });

  it('renders pagination controls', () => {
    renderUsers();
    expect(screen.getByText(/out of/i)).toBeInTheDocument();
  });

  // Negative tests
  it('does not render context menu by default', () => {
    renderUsers();
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });

  it('shows context menu when three dot button is clicked', async () => {
    renderUsers();
    const menuButtons = screen.getAllByLabelText('More options');
    fireEvent.click(menuButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('View Details')).toBeInTheDocument();
      expect(screen.getByText('Blacklist User')).toBeInTheDocument();
      expect(screen.getByText('Activate User')).toBeInTheDocument();
    });
  });

  it('closes filter popover when reset is clicked', async () => {
    renderUsers();
    const filterButtons = screen.getAllByLabelText(/filter by/i);
    fireEvent.click(filterButtons[0]);
    await waitFor(() => {
      expect(screen.getByText('Reset')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Reset'));
    await waitFor(() => {
      expect(screen.queryByText('Reset')).not.toBeInTheDocument();
    });
  });
});