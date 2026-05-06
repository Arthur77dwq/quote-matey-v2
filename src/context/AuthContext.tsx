'use client';
import {
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
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
  const auth = getFirebaseAuth();
  const googleProvider = getGoogleProvider();

  const authInitError = {
    code: 'auth/init',
    message: 'Auth not initialized',
  };

  async function handleAuthStateChange(firebaseUser: FirebaseUser | null) {
    try {
      if (!firebaseUser) {
        setUser(null);
        await removeAuthCookie();
        return;
      }

      const token = await firebaseUser.getIdToken();

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        token,
      });

      await setAuthCookie(token);
    } catch {
      setUser(null);

      await removeAuthCookie();
    }
  }
  useEffect(() => {
    if (auth) {
      const unSubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
        void handleAuthStateChange(firebaseUser);
      });

      return () => unSubscribe();
    }
  }, [auth]);

  const withPopUp = async () => {
    try {
      setLoading(true);

      if (!auth)
        throw new Error(getFirebaseErrorMessage(authInitError).message);

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

      if (!auth)
        throw new Error(getFirebaseErrorMessage(authInitError).message);

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

      if (!auth)
        throw new Error(getFirebaseErrorMessage(authInitError).message);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await sendEmailVerification(userCredential.user);
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

      if (!auth)
        throw new Error(getFirebaseErrorMessage(authInitError).message);

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

      if (!auth)
        throw new Error(getFirebaseErrorMessage(authInitError).message);

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
