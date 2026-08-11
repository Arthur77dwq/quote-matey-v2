'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/context/AuthContext';
import {
  loginSchema,
  resetSchema,
  signUpSchema,
} from '@/lib/schemas/auth.schema';
import { cn } from '@/lib/utils';
import { loginFormData, resetFormData, signUpFormData } from '@/types/global';
import { AUTHFoot, AUTHForm, AUTHHead } from '@/types/pages';

import { Input } from './form-input';
import { Icon } from './icon';
import { Description, Title } from './section-header';
import { Button } from './ui/button';

export const FormHead = ({
  logo,
  title,
  description,
  className,
}: AUTHHead & { className?: string }) => (
  <div className={cn('w-full h-fit flex flex-col gap-2', className)}>
    {logo?.src && (
      <Image src={logo?.src} alt={logo.alt} width={150} height={80} />
    )}
    {title && (
      <Title
        className="w-fit font-inter text-left sm:whitespace-nowrap lg:whitespace-normal leading-10 text-[2.125rem]!"
        title={title}
      />
    )}
    {description && !Array.isArray(description) && (
      <p className="w-full">{description}</p>
    )}
  </div>
);

export const FormFooter = ({ buttons, text }: AUTHFoot) => {
  const { loading, withPopUp } = useAuth();
  return (
    <div className="w-full h-fit flex flex-col">
      <div className="w-full h-fit flex flex-col justify-center items-center gap-2 pb-2">
        {buttons.map((element, i) =>
          element.type && element.type === 'separator' ? (
            <div
              key={`${i}-${element.id}`}
              className="w-full relative h-5 flex justify-center items-center"
            >
              <div className="w-full border-dashed border-t-2 border-neutral-300" />
              <span className="absolute top-1/2 -translate-y-1/2 h-fit rounded-full bg-white px-2 py-0 text-xl text-neutral-400">
                {element.text}
              </span>
            </div>
          ) : (
            <Button
              key={`${i}-${element.id}`}
              onClick={() => {
                if (element.action === 'authWithPopUp') withPopUp();
              }}
              type={element.type}
              disabled={loading}
              variant={element.variant}
              className={cn(
                'cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold transition-all hover:-translate-y-0.1',
                element.variant === 'primary'
                  ? 'bg-[#f57a0a] hover:bg-[#e06d00] text-white'
                  : 'text-neutral-900 border-[#E8E8EA] border-2',
              )}
            >
              {element.icon && element.icon.icon && (
                <Icon name={element.icon.icon} className="size-6" />
              )}
              {element.text}
            </Button>
          ),
        )}
      </div>

      <div className="whitespace-nowrap text-lg flex justify-center items-center">
        {text && <Description description={text} />}
      </div>
    </div>
  );
};

export function AuthFormSection({
  type,
  onSuccess,
  top,
  header,
  body,
  footer,
  variant = 'primary',
  className,
}: AUTHForm & { className?: string }) {
  const { error, user, signIn, signUp, resetPassword } = useAuth();
  const router = useRouter();

  const resolverScheme = () => {
    if (type === 'login') return loginSchema;
    if (type === 'reset-password') return resetSchema;
    return signUpSchema;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData | signUpFormData | resetFormData>({
    resolver: zodResolver(resolverScheme()),
  });

  const onSubmit = async (
    data: loginFormData | signUpFormData | resetFormData,
  ) => {
    if (data.type === 'reset-password') {
      await resetPassword(data.email);
      router.push(
        `${onSuccess}?email=${encodeURIComponent(data?.email || '')}`,
      );
    } else if (data.type === 'signup') {
      await signUp(data.email, data.password);
    } else if (data.type === 'login') {
      await signIn(data.email, data.password);
    }
  };

  useEffect(() => {
    if (user) {
      router.push(onSuccess);
    }
  }, [user, router, onSuccess]);

  return (
    <div
      className={cn(
        'lg:relative lg:top-0 lg:w-3/5 lg:h-full bg-[#FEFEFE]',
        className,
      )}
    >
      <Button
        onClick={() => router.back()}
        className={cn(
          'absolute top-3 right-3 flex w-fit h-fit items-center justify-center rounded-[0.56rem] shadow-sm text-neutral-900 cursor-pointer',
          top?.text
            ? ''
            : 'rounded-full bg-neutral-200/50 size-6 p-3 hover:bg-neutral-200',
        )}
      >
        {top?.icon.active && (
          <Icon
            name={top?.icon.icon || ''}
            className="size-6 text-neutral-900"
          />
        )}
        {top?.text && (
          <span className="font-medium font-inter">{top?.text}</span>
        )}
      </Button>

      <div className="w-full h-fit gap-12.5  px-0 py-8 sm:p-10 flex flex-col justify-between">
        {header && (
          <FormHead
            className={cn(
              variant === 'secondary'
                ? 'flex flex-col justify-center items-center text-center'
                : '',
            )}
            {...header}
          />
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 h-fit sm:h-full w-full flex flex-col justify-between"
        >
          <div className="flex flex-col justify-center gap-3 h-full w-full py-3 m-0">
            <div className="w-full flex flex-col justify-center items-center gap-3">
              {body?.inputs.map((input, i: number) => (
                <Input
                  className="w-full"
                  key={`${i}-${input.id}`}
                  {...{ input, register, errors }}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 w-full text-left text-xs">{error}</p>
            )}

            {body?.links && body?.links.length > 0 && (
              <div className="flex-col flex items-center">
                {body?.links.map(
                  (link, i) =>
                    link.active && (
                      <Link
                        key={`${i}-${link.id}`}
                        href={link.href}
                        target={link.target}
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        {link.text}
                      </Link>
                    ),
                )}
              </div>
            )}
          </div>

          {footer && <FormFooter {...footer} />}
        </form>
      </div>
    </div>
  );
}
