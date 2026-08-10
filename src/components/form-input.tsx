import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { FormField } from '@/types/pages';

import { Icon } from './icon';
import { Password } from './password-input';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';

export function Input<T extends FieldValues>({
  input,
  errors,
  register,
}: {
  input: FormField<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}) {
  const error = errors[input.name];
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
      {error?.message && (
        <p className="text-red-500 text-xs">{String(error.message)}</p>
      )}
    </div>
  );
}
