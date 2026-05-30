import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetails from '../pages/UserDetails/UserDetails';

const mockUser = {
  id: 'test-id-123',
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
  accountBalance: 200000,
  accountNumber: '9912345678',
  socials: {
    facebook: 'Grace Effiom',
    instagram: '@grace_effiom',
    twitter: '@grace_effiom',
  },
  education: {
    level: 'B.Sc',
    employmentStatus: 'Employed',
    sector: 'FinTech',
    duration: '2 years',
    officeEmail: 'grace@lendsqr.com',
    monthlyIncome: [200000, 400000],
    loanRepayment: 40000,
  },
  tier: 1,
};

vi.mock('../utils/storage', () => ({
  getUserFromStorage: () => mockUser,
  saveUserToStorage: vi.fn(),
  removeUserFromStorage: vi.fn(),
}));

const renderUserDetails = () =>
  render(
    <MemoryRouter initialEntries={[`/dashboard/users/${mockUser.id}`]}>
      <Routes>
        <Route
          path="/dashboard/users/:id"
          element={<UserDetails />}
        />
      </Routes>
    </MemoryRouter>
  );

describe('UserDetails Page', () => {
  // Positive tests
  it('renders the user details page title', () => {
    renderUserDetails();
    expect(screen.getByText('User Details')).toBeInTheDocument();
  });

  it('renders back to users button', () => {
    renderUserDetails();
    expect(screen.getByText('Back to Users')).toBeInTheDocument();
  });

  it('renders blacklist and activate buttons', () => {
    renderUserDetails();
    expect(screen.getByText('BLACKLIST USER')).toBeInTheDocument();
    expect(screen.getByText('ACTIVATE USER')).toBeInTheDocument();
  });

  // Fix 1 — use getByRole heading to avoid matching infoValue paragraphs
  it('renders the username correctly', () => {
    renderUserDetails();
    const heading = screen.getByRole('heading', { name: 'Grace Effiom' });
    expect(heading).toBeInTheDocument();
  });

  // Fix 2 — scope tabs query to the tabs container using test id
  it('renders all tabs', () => {
    renderUserDetails();
    const tabsContainer = screen.getByTestId('tabs-container');
    const tabs = within(tabsContainer);
    expect(tabs.getByText('General Details')).toBeInTheDocument();
    expect(tabs.getByText('Documents')).toBeInTheDocument();
    expect(tabs.getByText('Bank Details')).toBeInTheDocument();
    expect(tabs.getByText('Loans')).toBeInTheDocument();
    expect(tabs.getByText('Savings')).toBeInTheDocument();
    expect(tabs.getByText('App and System')).toBeInTheDocument();
  });

  it('renders personal information section', () => {
    renderUserDetails();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders education and employment section', () => {
    renderUserDetails();
    expect(screen.getByText('Education and Employment')).toBeInTheDocument();
  });

  it('renders socials section', () => {
    renderUserDetails();
    expect(screen.getByText('Socials')).toBeInTheDocument();
  });

  it('renders guarantor section', () => {
    renderUserDetails();
    expect(screen.getByText('Guarantor')).toBeInTheDocument();
  });

  it('switches tab when clicked', () => {
    renderUserDetails();
    const tabsContainer = screen.getByTestId('tabs-container');
    const documentsTab = within(tabsContainer).getByText('Documents');
    fireEvent.click(documentsTab);
    expect(
      screen.getByText('Documents content coming soon.')
    ).toBeInTheDocument();
  });

  // Negative tests
  it('does not show coming soon on General Details tab', () => {
    renderUserDetails();
    expect(
      screen.queryByText('General Details content coming soon.')
    ).not.toBeInTheDocument();
  });

  it('does not show other tab content when General Details is active', () => {
    renderUserDetails();
    expect(
      screen.queryByText('Bank Details content coming soon.')
    ).not.toBeInTheDocument();
  });
});