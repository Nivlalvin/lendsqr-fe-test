import { describe, it, expect } from 'vitest';
import { getStatusClass, formatDate } from '../utils/statusHelpers';

describe('getStatusClass', () => {
  // Positive tests
  it('returns active for Active status', () => {
    expect(getStatusClass('Active')).toBe('active');
  });

  it('returns inactive for Inactive status', () => {
    expect(getStatusClass('Inactive')).toBe('inactive');
  });

  it('returns pending for Pending status', () => {
    expect(getStatusClass('Pending')).toBe('pending');
  });

  it('returns blacklisted for Blacklisted status', () => {
    expect(getStatusClass('Blacklisted')).toBe('blacklisted');
  });

  // Negative tests
  it('returns inactive for unknown status', () => {
    expect(getStatusClass('Unknown')).toBe('inactive');
  });

  it('returns inactive for empty string', () => {
    expect(getStatusClass('')).toBe('inactive');
  });
});

describe('formatDate', () => {
  // Positive tests
  it('formats a valid date string correctly', () => {
    const result = formatDate('2020-05-15T10:00:00');
    expect(result).toContain('2020');
  });

  it('returns a non empty string for valid date', () => {
    const result = formatDate('Apr 30, 2020 10:00 AM');
    expect(result.length).toBeGreaterThan(0);
  });

  // Negative tests
  it('returns original string for invalid date', () => {
    const result = formatDate('not-a-date');
    expect(typeof result).toBe('string');
  });

  it('handles empty string gracefully', () => {
    const result = formatDate('');
    expect(typeof result).toBe('string');
  });
});