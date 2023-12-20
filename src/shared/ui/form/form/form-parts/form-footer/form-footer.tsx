import type { ReactNode } from 'react';

import { BlockStack } from '@/ui/block-stack';
import { Button } from '@/ui/button';
import { ButtonGroup } from '@/ui/button-group';

import classes from './form-footer.module.css';

interface FormFooterProps {
  children?: ReactNode;
  align?: 'start' | 'end' | 'center';
}

export const FormFooter = ({ align = 'end', children }: FormFooterProps) => {
  return (
    <BlockStack inlineAlign={align} as='div' className={classes['form-footer']}>
      {children ? children : (
        <ButtonGroup>
          <Button
            size='medium'
            appearance='primary'
            type='submit'
          >
            Submit
          </Button>
        </ButtonGroup>
      )}
    </BlockStack>
  );
};
