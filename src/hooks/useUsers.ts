import { useState, useEffect } from 'react';
import type { User } from '../types/user';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await import('../data/users.json');
        setTimeout(() => {
          setUsers(data.default as unknown as User[]);
          setLoading(false);
        }, 500);
      } catch {
        setError('Failed to load users');
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return { users, loading, error };
};

export { useUsers };