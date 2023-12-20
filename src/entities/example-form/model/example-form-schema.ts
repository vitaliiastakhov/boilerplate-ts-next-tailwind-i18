import { z } from 'zod';

const MIN_BODY_LENGTH = 17;

export const exampleFormSchema = z.object({
  body: z.string().min(MIN_BODY_LENGTH),
});

export type ExampleFormFormData = z.infer<typeof exampleFormSchema>;
