import type React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import {authClient} from '@/lib/auth';

interface Session {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
}

interface LoginData {
  email: string;
  password: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [session, setSession] = useState<Session | null>(null);
  const {data, isPending, refetch} = authClient.useSession();

  const login = async (data: LoginData) => {
    const result = await authClient.signIn.email(data);

    if (result.error) {
      throw new Error('Failed to login');
    }

    await refetch();
  };

  const logout = async () => {
    await authClient.signOut();
    // await refetch();
  };

  useEffect(() => {
    setSession(data);
  }, [data]);

  return (
    <AuthContext.Provider
      value={{isAuthenticated: !!data, login, session, logout}}
    >
      {!isPending && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
