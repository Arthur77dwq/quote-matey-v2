import { ErrorConfig } from '@/types/global';

export const FIREBASE_ERROR_MAP: Record<string, ErrorConfig> = {
  // Auth / Login / Reset
  'auth/invalid-email': {
    message: 'Please enter a valid email address.',
    type: 'error',
  },

  'auth/user-not-found': {
    message: 'If this email exists, a reset link has been sent.',
    type: 'info',
    hide: true,
  },

  'auth/wrong-password': {
    message: 'Incorrect password. Please try again.',
    type: 'error',
  },

  'auth/email-already-in-use': {
    message: 'An account with this email already exists.',
    type: 'error',
  },

  'auth/weak-password': {
    message: 'Password should be at least 6 characters.',
    type: 'error',
  },

  // Common
  'auth/too-many-requests': {
    message: 'Too many attempts. Please try again later.',
    type: 'warning',
  },

  'auth/network-request-failed': {
    message: 'Network error. Check your connection.',
    type: 'error',
  },

  // Logout
  'auth/internal-error': {
    message: 'Logout failed. Please try again.',
    type: 'error',
  },

  'auth/invalid-user-token': {
    message: 'Session expired. Please log in again.',
    type: 'warning',
  },

  'auth/user-token-expired': {
    message: 'Session expired. Please log in again.',
    type: 'warning',
  },

  // Popup specific
  'auth/popup-closed-by-user': {
    message: 'Sign-in cancelled.',
    type: 'info',
  },
  'auth/popup-blocked': {
    message: 'Popup blocked. Please allow popups and try again.',
    type: 'warning',
  },
  'auth/cancelled-popup-request': {
    message: 'Popup request cancelled.',
    type: 'info',
  },
};
