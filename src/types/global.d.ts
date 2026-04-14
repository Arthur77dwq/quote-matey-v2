export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  withPopUp: () => Promise<UserCredential | undefined>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<UserCredential | undefined>;
};

export type ErrorConfig = {
  message: string;
  type?: 'error' | 'warning' | 'info';
  hide?: boolean;
  action?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
