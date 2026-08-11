import { DATA } from './data';
import ResetPassword from './reset-password';

export default function ResetPasswordPage() {
  return DATA.sections && <ResetPassword sections={DATA.sections} />;
}
