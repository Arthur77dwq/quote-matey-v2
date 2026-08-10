'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';

import { Icon } from '@/components/icon';
import { Description, Title } from '@/components/section-header';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { useAuth } from '@/context/AuthContext';
import { loginSchema } from '@/lib/schemas/auth.schema';
import { cn, nameAcronoym } from '@/lib/utils';
import { ImageType, loginFormData } from '@/types/global';
import {
  AUTHFoot,
  AUTHForm,
  AUTHHead,
  AUTHINFO,
  AUTHSCREEN,
  CARDType,
  FormField,
  Section,
} from '@/types/pages';

export function Password({
  input,
  errors,
  register,
}: {
  input: FormField;
  register: UseFormRegister<{
    password: string;
    email: string;
  }>;
  errors: FieldErrors<{
    password: string;
    email: string;
  }>;
}) {
  const [show, setShow] = useState(false);

  const toggleShowPassword = () => {
    setShow(!show);
  };
  return (
    <div className="grid gap-2">
      <InputGroup className="min-h-13 rounded-[0.58rem] border-[#E8E8EA] focus-within:border-[#E8E8EA]! focus-within:ring-0!">
        <InputGroupInput
          {...register(input.name)}
          name={input.name}
          type={show ? 'text' : input.type}
          className="text-md font-medium"
          placeholder={input.placeholder}
        />
        {input.icon?.active && (
          <InputGroupAddon>
            <Icon name={input.icon?.icon || ''} />
          </InputGroupAddon>
        )}
        <InputGroupAddon align="inline-end">
          {show ? (
            <Icon
              name="Eye"
              className="cursor-pointer"
              onMouseEnter={toggleShowPassword}
              onMouseLeave={toggleShowPassword}
            />
          ) : (
            <Icon
              name="EyeClosed"
              className="cursor-pointer"
              onMouseEnter={toggleShowPassword}
              onMouseLeave={toggleShowPassword}
            />
          )}
        </InputGroupAddon>
      </InputGroup>
      <p className="text-red-500 text-xs">{errors[input.name]?.message}</p>
    </div>
  );
}

export function Input({
  input,
  errors,
  register,
}: {
  input: FormField;
  register: UseFormRegister<{
    password: string;
    email: string;
  }>;
  errors: FieldErrors<{
    password: string;
    email: string;
  }>;
}) {
  if (input.type === 'password')
    return <Password key={`${input.id}`} {...{ input, register, errors }} />;
  return (
    <div className="grid gap-2 w-full" key={`${input.id}`}>
      <InputGroup className="min-h-13 rounded-[0.58rem] border-[#E8E8EA] focus-within:border-[#E8E8EA]! focus-within:ring-0!">
        <InputGroupInput
          {...register(input.name)}
          name={input.name}
          className="text-md font-medium"
          placeholder={input.placeholder}
        />
        {input.icon?.active && (
          <InputGroupAddon>
            <Icon name={input.icon?.icon || ''} />
          </InputGroupAddon>
        )}
      </InputGroup>
      <p className="text-red-500 text-xs">{errors[input.name]?.message}</p>
    </div>
  );
}

const FormHead = ({ logo, title, description }: AUTHHead) => (
  <div className="w-full h-fit flex flex-col gap-2">
    {logo?.src && (
      <Image src={logo?.src} alt={logo.alt} width={150} height={80} />
    )}
    {title && (
      <Title
        className="w-full font-inter text-left sm:whitespace-nowrap leading-15 text-[2.125rem]!"
        title={title}
      />
    )}
    {description && <p className="w-full">{description}</p>}
  </div>
);

export const FormFooter = ({ buttons, text }: AUTHFoot) => {
  const { loading, withPopUp } = useAuth();
  return (
    <div className="w-full flex flex-col gap-5">
      {buttons.map((element, i) =>
        element.type && element.type === 'separator' ? (
          <div
            key={`${i}-${element.id}`}
            className="w-full relative h-5 flex justify-center items-center"
          >
            <div className="w-full border-dashed border-t-2 border-neutral-300" />
            <span className="absolute top-1/2 -translate-y-1/2 bg-white px-2 py-0 text-xl text-neutral-400">
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
      <div className="whitespace-nowrap text-lg flex justify-center items-center">
        {text && <Description description={text} />}
      </div>
    </div>
  );
};

export function Chip({
  icon,
  title,
  description,
  variant = 'primary',
}: CARDType) {
  switch (variant) {
    case 'secondary':
      return (
        <Card className="h-full aspect-square gap-0 bg-white p-0  overflow-hidden flex justify-center items-center shadow-md border-none">
          <CardContent className="w-full h-full flex flex-col justify-start items-start gap-2.5 p-3">
            <div>
              {icon && icon.icon && icon.active && (
                <Icon
                  name={icon.icon}
                  color={icon.color}
                  stroke={icon.stroke}
                />
              )}
            </div>
            <div>
              {title && (
                <Title
                  className="tracking-normal leading-[1em] text-left font-inter text-neutral-900 text-[1rem]!"
                  title={title}
                />
              )}
              <p className="whitespace-normal text-[0.8rem]! font-medium font-inter text-[#868C91]">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      );
    case 'primary':
    default:
      return (
        <Card className="p-0 overflow-hidden rounded-[0.5rem] border-none shadow-md flex justify-center items-center ">
          <CardContent className="h-fit w-full flex justify-center items-center gap-2.5 bg-white px-3 py-6">
            <div className="w-fit h-full flex justify-center items-center">
              {icon && icon.icon && icon.active && (
                <Icon name={icon.icon} color={icon.color} className="size-5" />
              )}
            </div>
            <div className="w-full h-full ">
              {title && (
                <Title
                  className="tracking-normal text-left text-[1rem]! whitespace-nowrap font-bold text-[#14142E] font-inter"
                  title={title}
                />
              )}
              <p className="font-inter font-medium text-[0.65rem]! text-[#393942]">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      );
  }
}

export function Achievement({
  title,
  users,
  ratingText,
  star,
}: {
  title: string;
  users: ImageType[];
  ratingText: string;
  star: number;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-2.5 w-full h-fit">
      <p className="text-neutral-600 font-semibold">{title}</p>
      <div className="flex justify-center gap-4 items-center w-full">
        <AvatarGroup className="ring-white">
          {users.map((avatar, i) => (
            <Avatar className="ring-white ring-0.5 size-4" key={i}>
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{nameAcronoym(avatar.alt)}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex">
          {Array.from({ length: star }).map((_, i) => (
            <Icon
              key={i}
              name="Star"
              fill="#FFD700"
              stroke="#FFD700"
              className="size-4"
            />
          ))}
        </div>
        <span className="text-[0.75rem] text-neutral-600 font-semibold">
          {ratingText}
        </span>
      </div>
    </div>
  );
}

export function AuthFormSection({
  top,
  header,
  body,
  footer,
  className,
}: AUTHForm & { className?: string }) {
  const { error, user, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginFormData) => {
    await signIn(data.email, data.password);
  };

  return (
    <div className={cn('lg:w-2/5 h-full bg-[#FEFEFE]', className)}>
      <Button
        onClick={() => router.back()}
        className="absolute top-3 right-3 flex w-20 h-10 items-center justify-center rounded-[0.56rem] shadow-sm text-neutral-900 cursor-pointer"
      >
        {top?.icon.active && (
          <Icon
            name={top?.icon.icon || ''}
            className="size-6 text-neutral-900"
          />
        )}
        <span className="font-medium font-inter">{top?.text}</span>
      </Button>

      <div className="w-full h-full px-0 py-10 sm:p-12.5 flex flex-col justify-between">
        {header && <FormHead {...header} />}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 h-full w-full flex flex-col justify-between"
        >
          <div className="flex flex-col justify-center gap-3 h-full w-full py-3">
            {body?.inputs.map((input: FormField, i: number) => (
              <Input
                key={`${i}-${input.id}`}
                {...{ input, register, errors }}
              />
            ))}
            <p className="text-red-500 w-full text-left text-xs">{error}</p>

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
          </div>

          {footer && <FormFooter {...footer} />}
        </form>
      </div>
    </div>
  );
}

export function AuthHeroSection({
  topCard,
  bottom,
  achievement,
  className,
  ...props
}: AUTHINFO & { className?: string }) {
  return (
    <div className={cn('relative w-3/5 h-full overflow-hidden', className)}>
      <div className="w-full h-full bg-white/30" />
      <div className="absolute top-2/6 -left-20  bg-[#102E60] blur-3xl rounded-full size-60" />
      <div className="absolute top-0 right-0  bg-[#FF7B00] blur-3xl rounded-full size-40" />

      <div className="absolute inset-0 z-10 py-10 flex justify-center items-center">
        <div className="h-full flex flex-col-reverse lg:flex-col items-center justify-between gap-5 px-10">
          {topCard && <Chip {...topCard} />}

          {props.image && props.image.src && (
            <div className="opacity-0 lg:opacity-100 aspect-162.25/98.5 shadow-md w-auto h-auto flex justify-center items-center rounded-xl overflow-hidden">
              <Image
                src={props.image.src}
                alt={props.image.alt}
                width={649}
                height={394}
                className="w-full h-full"
              />
            </div>
          )}

          <div className="flex justify-center items-center gap-6 w-full h-35">
            {bottom.map((card, i) => (
              <Chip key={i} {...card} />
            ))}
          </div>

          <Achievement {...achievement} />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage({ sections }: { sections: Section[] }) {
  const { form, info } = sections[0] as AUTHSCREEN;

  return (
    <section className="relative flex justify-center items-center w-full h-screen">
      <AuthFormSection
        {...form}
        className="static sm:absolute lg:static z-20 w-full sm:w-fit h-full sm:h-fit p-3 sm:p-0 top-70 shadow-none sm:shadow-xl/30 md:shadow-none rounded-none sm:rounded-2xl"
      />
      <AuthHeroSection {...info} className="hidden sm:block w-full" />
    </section>
  );
}
