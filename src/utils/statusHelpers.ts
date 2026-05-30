export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export const getStatusClass = (status: string): string => {
  const map: Record<string, string> = {
    Active: 'active',
    Inactive: 'inactive',
    Pending: 'pending',
    Blacklisted: 'blacklisted',
  };
  return map[status] || 'inactive';
};

export const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return dateStr;
  }
};