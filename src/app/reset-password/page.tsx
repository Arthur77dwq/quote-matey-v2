import { DATA } from './data';
import ResetPassword from './reset-password';

export default function ResetPasswordPage() {
  // const { loading, error, resetPassword } = useAuth();
  // const router = useRouter();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<resetFormData>({
  //   resolver: zodResolver(resetSchema),
  // });

  // const onSubmit = async (data?: resetFormData) => {
  //   await resetPassword(data?.email || '');
  //   router.push(
  //     `/reset-password/success?email=${encodeURIComponent(data?.email || '')}`,
  //   );
  // };

  return DATA.sections && <ResetPassword sections={DATA.sections} />;
}
