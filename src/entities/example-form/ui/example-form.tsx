import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

import { useTranslation } from 'next-i18next';

import { Form, TextField } from '@/ui/form';
import { InlineStack } from '@/ui/inline-stack';
import { Text } from '@/ui/text';

import {
  type ExampleFormFormData,
  exampleFormSchema,
} from '../model/example-form-schema';

interface ExampleFormProps {}

export const ExampleForm = (props: ExampleFormProps) => {
  const { t } = useTranslation();
  z.setErrorMap(makeZodI18nMap({ t }));

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<
    ExampleFormFormData
  >({
    resolver: zodResolver(exampleFormSchema),
  });

  const submitExampleForm = async (exampleFormData: ExampleFormFormData) => {
    exampleFormData.body && reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(submitExampleForm)}
      header={
        <Form.Header>
          <Text as='h4' size='h3'>Form Title</Text>
        </Form.Header>
      }
    >
      <Form.Content>
        <InlineStack
          as='div'
          size='large'
        >
          <Controller
            control={control}
            name='body'
            render={({ field }) => {
              return (
                <TextField
                  size='large'
                  resize
                  fullWidth={true}
                  multiline
                  placeholder='Body placeholder'
                  autoComplete='off'
                  validation={errors.body
                    && {
                      status: 'invalid',
                      text: errors.body.message,
                    }}
                  {...field}
                  required
                />
              );
            }}
          />
        </InlineStack>
      </Form.Content>
    </Form>
  );
};
