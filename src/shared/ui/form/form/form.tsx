import type { FormHTMLAttributes, ReactNode } from 'react';

import { useCallback } from 'react';

import { FormContent, FormFooter, FormHeader } from './form-parts';

interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'autoComplete'>
{
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  autoComplete?: boolean;
}

export const Form = (props: FormProps) => {
  const { onSubmit, header, footer, children, autoComplete, ...restProps } =
    props;
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(event);
    },
    [onSubmit],
  );

  const autoCompleteInputs = normalizeAutoComplete(autoComplete);

  return (
    <form
      autoComplete={autoCompleteInputs}
      onSubmit={handleSubmit}
      {...restProps}
    >
      {header}
      {children}
      {footer ?? <FormFooter />}
    </form>
  );
};

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) {
    return autoComplete;
  }

  return autoComplete ? 'on' : 'off';
}

Form.Footer = FormFooter;
Form.Header = FormHeader;
Form.Content = FormContent;
