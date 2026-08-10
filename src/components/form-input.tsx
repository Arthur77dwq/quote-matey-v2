import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormField } from '@/types/pages';

import { Icon } from './icon';
import { Password } from './password-input';
import { Description } from './section-header';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { Label } from './ui/label';

export function Input<T extends FieldValues>({
  className,
  input,
  errors,
  register,
}: {
  className?: string;
  input: FormField<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}) {
  const error = errors[input.name];
  if (input.type === 'password')
    return (
      <Password
        className={className}
        key={`${input.id}`}
        {...{ input, register, errors }}
      />
    );

  if (input.type === 'checkbox')
    return (
      <div className={cn('flex w-full gap-3', className)}>
        <input
          type="checkbox"
          className="border-neutral-400 text-white data-[state=checked]:bg-[#e06d00]"
          id={input.id}
          {...register(input.name)}
        />
        <Label htmlFor={input.id} className="cursor-pointer">
          {input.label && (
            <Description description={input.label} className="text-[0.8rem]!" />
          )}
        </Label>
      </div>
    );

  return (
    <div className={cn('grid gap-2 w-full', className)} key={`${input.id}`}>
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

      {error?.message && (
        <p className="text-red-500 text-xs">{String(error.message)}</p>
      )}
    </div>
  );
}
