import { DATA } from './data';
import SuccessResetPassword from './success';

export default function SuccessResetPasswordPage() {
  return DATA.sections && <SuccessResetPassword sections={DATA.sections} />;
}
