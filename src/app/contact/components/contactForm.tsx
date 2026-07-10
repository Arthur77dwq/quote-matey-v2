import { useGSAP } from '@gsap/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { gsap } from '@/lib/animations/plugins';
import { contactSchema } from '@/lib/schemas/contact.schema';
import { cn } from '@/lib/utils';
import { AnimatedRef } from '@/types/global';
import { CONTACTFORM, contactFormData } from '@/types/pages';

const useSectionAnimation = ({
  sectionRef,
  ref,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  ref: React.ForwardedRef<AnimatedRef>;
}) => {
  const tl = useRef(gsap.timeline());

  useImperativeHandle(ref, () => ({
    timeline: tl.current,
  }));

  useGSAP(() => {
    // Animation Here
    tl.current.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 50,
        duration: 1,
      },
      { opacity: 1, y: 0, duration: 1 },
    );
  });
};

export const ContactForm = forwardRef<AnimatedRef, CONTACTFORM>(
  ({ visible, Inputs }, ref) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    useSectionAnimation({ sectionRef, ref });

    const {
      register,
      // handleSubmit,
      formState: { errors },
    } = useForm<contactFormData>({
      resolver: zodResolver(contactSchema),
    });

    // const onSubmit = async (data: contactFormData) => {
    //   console.log(data);
    // };

    return (
      visible && (
        <section
          ref={sectionRef}
          className="opacity-0 px-4 sm:px-0 sm:pt-0 flex justify-center items-start pb-50"
        >
          <Card className="p-0  w-full sm:w-8/10 bg-neutral-50 border-0">
            <CardContent className="flex justify-center items-center p-10">
              <form
                // onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col justify-between items-center gap-7.5"
              >
                {Inputs.map((input, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full flex flex-col lg:flex-row items-center justify-between gap-7.5"
                    >
                      {input.map((each, z) => (
                        <Field
                          className="w-full gap-2.5"
                          key={`${z}-${each.name}`}
                        >
                          <FieldLabel
                            htmlFor={`${z}-${each.name}`}
                            className="text-[1rem] font-inter font-medium text-neutral-600"
                          >
                            {each.field}
                            {each.required && <sup>*</sup>}
                          </FieldLabel>
                          <InputGroup
                            className={cn(
                              'text-neutral-900 bg-white border border-neutral-100 focus-within:ring-4 focus-within:ring-primary-900/10',
                              each.type === 'textarea'
                                ? 'min-h-37.5 h-37.5'
                                : 'h-12.5',
                            )}
                          >
                            {each.type === 'textarea' ? (
                              <InputGroupTextarea
                                className="text-neutral-900 min-h-37.5 h-full resize placeholder:text-[1rem] placeholder:font-inter placeholder:font-medium placeholder:text-neutral-900/50"
                                id={`${z}-${each.name}`}
                                {...register(each.name)}
                                {...each}
                              />
                            ) : (
                              <InputGroupInput
                                className="h-full placeholder:text-[1rem] placeholder:font-inter placeholder:font-medium placeholder:text-neutral-900/50"
                                id={`${z}-${each.name}`}
                                {...register(each.name)}
                                {...each}
                              />
                            )}
                          </InputGroup>
                          <p className="text-red-500 text-xs">
                            {errors[each.name]?.message}
                          </p>
                        </Field>
                      ))}
                    </div>
                  );
                })}
                <div className="w-full">
                  <div className="w-fit">
                    <Button variant="dark" type="submit" className="w-fit">
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      )
    );
  },
);
