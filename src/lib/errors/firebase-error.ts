import { FIREBASE_ERROR_MAP } from '@/constant/firebase-errors';
import { ErrorConfig } from '@/types/global';

export function getFirebaseErrorMessage(error: unknown): ErrorConfig {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = (error as { code: string }).code;

    return (
      FIREBASE_ERROR_MAP[code] || {
        message: 'Something went wrong.',
        type: 'error',
      }
    );
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  return {
    message: 'Something went wrong.',
    type: 'error',
  };
}
