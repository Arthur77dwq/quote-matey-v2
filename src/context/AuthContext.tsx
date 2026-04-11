'use client';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
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

import { removeAuthCookie, setAuthCookie } from '@/app/actions/auth';
import { getFirebaseAuth, getGoogleProvider } from '@/config/firebase';
import { getFirebaseErrorMessage } from '@/lib/errors/firebase-error';
import { AuthContextType, User } from '@/types/global';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const auth = getFirebaseAuth();
  const googleProvider = getGoogleProvider();

  useEffect(() => {
    if (auth) {
      const unSubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        const token = await firebaseUser?.getIdToken();

        if (token) {
          setUser({
            uid: firebaseUser?.uid || '',
            email: firebaseUser?.email || '',
            displayName: firebaseUser?.displayName || displayName || '',
            photoURL: firebaseUser?.photoURL || '',
            token,
          });
          await setAuthCookie(token);
        } else {
          await removeAuthCookie();
        }
      });

      return () => unSubscribe();
    }
  }, [auth]);

  const withPopUp = async () => {
    try {
      setLoading(true);

      if (!auth) throw new Error('Auth not initialized');

      await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      const err = getFirebaseErrorMessage(error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);

      if (!auth) throw new Error('Auth not initialized');

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      const err = getFirebaseErrorMessage(error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);

      if (!auth) throw new Error('Auth not initialized');

      await createUserWithEmailAndPassword(auth, email, password);

      setDisplayName(name);
    } catch (error: unknown) {
      const err = getFirebaseErrorMessage(error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);

      if (!auth) throw new Error('Auth not initialized');

      await firebaseSignOut(auth);

      setUser(null);

      await removeAuthCookie?.();
    } catch (error: unknown) {
      const err = getFirebaseErrorMessage(error);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);

      if (!auth) throw new Error('Auth not initialized');

      await sendPasswordResetEmail(auth, email);

      setError('If this email exists, a reset link has been sent.');
    } catch (error: unknown) {
      const err = getFirebaseErrorMessage(error);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    resetPassword,
    withPopUp,
    signIn,
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
