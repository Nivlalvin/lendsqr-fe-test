import { describe, it, expect, beforeEach } from 'vitest';
import { saveUserToStorage, getUserFromStorage, removeUserFromStorage } from '../utils/storage';
import type { User } from '../types/user';

const mockUser: User = {
  id: 'test-id-123',
  organization: 'Lendsqr',
  username: 'Test User',
  email: 'test@lendsqr.com',
  phoneNumber: '08012345678',
  dateJoined: 'Apr 30, 2020 10:00 AM',
  status: 'Active',
  profile: {
    firstName: 'Test',
    lastName: 'User',
    phoneNumber: '08012345678',
    avatar: '',
    gender: 'Male',
    bvn: '12345678901',
    address: '10 Test Street',
    currency: 'NGN',
  },
  guarantor: {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '08098765432',
    gender: 'Male',
    address: '20 Guarantor Street',
  },
  accountBalance: 50000,
  accountNumber: '1234567890',
  socials: {
    facebook: 'Test User',
    instagram: '@testuser',
    twitter: '@testuser',
  },
  education: {
    level: 'B.Sc',
    employmentStatus: 'Employed',
    sector: 'FinTech',
    duration: '2 years',
    officeEmail: 'test@office.com',
    monthlyIncome: [100000, 200000],
    loanRepayment: 20000,
  },
  tier: 2,
};

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Positive tests
  it('saves user to localStorage', () => {
    saveUserToStorage(mockUser);
    const stored = localStorage.getItem(`user_${mockUser.id}`);
    expect(stored).not.toBeNull();
  });

  it('retrieves saved user from localStorage', () => {
    saveUserToStorage(mockUser);
    const retrieved = getUserFromStorage(mockUser.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.id).toBe(mockUser.id);
    expect(retrieved?.username).toBe(mockUser.username);
  });

  it('removes user from localStorage', () => {
    saveUserToStorage(mockUser);
    removeUserFromStorage(mockUser.id);
    const retrieved = getUserFromStorage(mockUser.id);
    expect(retrieved).toBeNull();
  });

  it('saves and retrieves all user fields correctly', () => {
    saveUserToStorage(mockUser);
    const retrieved = getUserFromStorage(mockUser.id);
    expect(retrieved?.email).toBe(mockUser.email);
    expect(retrieved?.organization).toBe(mockUser.organization);
    expect(retrieved?.status).toBe(mockUser.status);
    expect(retrieved?.tier).toBe(mockUser.tier);
  });

  // Negative tests
  it('returns null for non existent user id', () => {
    const retrieved = getUserFromStorage('non-existent-id');
    expect(retrieved).toBeNull();
  });

  it('returns null for empty id', () => {
    const retrieved = getUserFromStorage('');
    expect(retrieved).toBeNull();
  });

  it('handles corrupted localStorage data gracefully', () => {
    localStorage.setItem('user_bad-id', 'not-valid-json{{');
    const retrieved = getUserFromStorage('bad-id');
    expect(retrieved).toBeNull();
  });
});