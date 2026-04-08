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
  withPopUp: (email?: string, password?: string) => Promise<void>;
  withPassword: (email?: string, password?: string) => Promise<void>;
  signUp: (email?: string, password?: string) => Promise<void>;
  logOut: () => Promise<void>;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
