import type { User } from '../types/user';

export const saveUserToStorage = (user: User): void => {
  localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
};

export const getUserFromStorage = (id: string): User | null => {
  try {
    const data = localStorage.getItem(`user_${id}`);
    return data ? (JSON.parse(data) as User) : null;
  } catch {
    return null;
  }
};

export const removeUserFromStorage = (id: string): void => {
  localStorage.removeItem(`user_${id}`);
};