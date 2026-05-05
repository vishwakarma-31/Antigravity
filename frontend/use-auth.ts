'use client';

import { useEffect, useState } from 'react';

interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: 'customer' | 'admin';
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { user, loading };
}