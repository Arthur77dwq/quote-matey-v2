import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { contactSchema } from '@/lib/schemas/contact.schema';
import { CONTACTFORM, contactFormData } from '@/types/pages';

export function ContactForm({ visible, Inputs }: CONTACTFORM) {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<contactFormData>({
    resolver: zodResolver(contactSchema),
  });

  //   const onSubmit = async (data: contactFormData) => {
  //     console.log(data);
  //   };

  return (
    <Card>
      <CardContent>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form>
          {visible &&
            Inputs.map((input, i) => {
              return (
                <div
                  key={i}
                  className="w-full flex items-center justify-between"
                >
                  {input.map((each, z) => (
                    <Field className="w-full" key={`${z}-${each.name}`}>
                      <FieldLabel htmlFor={`${z}-${each.name}`}>
                        {each.field}
                        {each.required && <sup className="text-red-500">*</sup>}
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id={`${z}-${each.name}`}
                          {...register(each.name)}
                          {...each}
                        />
                      </InputGroup>
                      <p className="text-red-500 text-xs">
                        {errors[each.name]?.message}
                      </p>
                    </Field>
                  ))}
                </div>
              );
            })}
          <button type="submit">Submit</button>
        </form>
      </CardContent>
    </Card>
  );
}
