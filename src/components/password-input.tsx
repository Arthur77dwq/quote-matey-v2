import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { FormField } from '@/types/pages';

import { Icon } from './icon';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

type PasswordProps<T extends FieldValues> = {
  input: FormField<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export function Password<T extends FieldValues>({
  input,
  register,
  errors,
}: PasswordProps<T>) {
  const [show, setShow] = useState(false);
  const error = errors[input.name];

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
      {error?.message && (
        <p className="text-red-500 text-xs">{String(error.message)}</p>
      )}
    </div>
  );
}
