import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';
import ResetPassword from './reset-password';

export const metadata = generateMetadata(DATA.metadata);

export default function ResetPasswordPage() {
  return DATA.sections && <ResetPassword sections={DATA.sections} />;
}
