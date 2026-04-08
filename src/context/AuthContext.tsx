'use client';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { removeAuthCookie,setAuthCookie } from '@/app/actions/auth';
import { auth, googleProvider } from '@/config/firebase';
import { AuthContextType, User } from '@/types/global';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const token = await firebaseUser?.getIdToken();

      if (token) {
        setUser({
          uid: firebaseUser?.uid || '',
          email: firebaseUser?.email || '',
          displayName: firebaseUser?.displayName || '',
          photoURL: firebaseUser?.photoURL || '',
          token,
        });
        await setAuthCookie(token);
      } else {
        await removeAuthCookie();
      }
    });

    return () => unSubscribe();
  }, []);

  const withPopUp = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const withPassword = async (email?: string, password?: string) => {
    // TODO: Remove below block
    if (!email) {
      setError('Provide Email');
      return;
    }
    if (!password) {
      setError('Provide Password');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        'ankeshsharma@protonmail.com',
        'AlbAnkesh@09',
      );
    } catch {
      setError('Unable to signin');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email?: string, password?: string) => {
    // TODO: Remove below block
    if (!email) {
      setError('Provide Email');
      return;
    }
    if (!password) {
      setError('Provide Password');
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      setError('Unable to signup.');
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
    } catch {
      throw Error('Unable to logout.');
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    withPopUp,
    withPassword,
    signUp,
    logOut,
    error,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
